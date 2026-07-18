import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, Trash2, Upload, Eye } from 'lucide-react';
import { ROUTES } from '@/constants';
import { projectService } from '@/services/projectService';
import { readImageAsBase64, slugify } from '@/utils';
import { useToast } from '@/context/ToastContext';
import type { ProgrammeKey, Project, ProjectInput } from '@/types';

interface ProjectFormProps {
  initial?: Project;
}

const PROGRAMMES: Array<{ value: ProgrammeKey; label: string }> = [
  { value: 'horizon', label: 'Horizon Europe' },
  { value: 'erasmus', label: 'Erasmus+' },
  { value: 'life', label: 'LIFE Programme' },
  { value: 'cerv', label: 'CERV' },
];

const listFromText = (value: string) =>
  value
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);

const textFromList = (value: string[]) => value.join('\n');

export default function ProjectForm({ initial }: ProjectFormProps) {
  const navigate = useNavigate();
  const toast = useToast();
  const fileRef = useRef<HTMLInputElement>(null);
  const [slugTouched, setSlugTouched] = useState(Boolean(initial));
  const [imageError, setImageError] = useState<string | null>(null);

  const schema = z.object({
    title: z.string().min(1, 'Title is required'),
    slug: z
      .string()
      .min(1, 'Slug is required')
      .regex(/^[a-z0-9-]+$/, 'Use lowercase latin letters, numbers and dashes only')
      .refine(async (value) => projectService.isSlugUnique(value, initial?.id), 'This slug is already in use'),
    programme: z.enum(['horizon', 'erasmus', 'life', 'cerv']),
    programmeLabel: z.string().min(1, 'Programme label is required'),
    intro: z.string().min(1, 'Intro is required'),
    overview: z.string().min(1, 'Overview is required'),
    duration: z.string().min(1, 'Duration is required'),
    countries: z.string().min(1, 'Add at least one country'),
    partners: z.string().min(1, 'Add at least one partner'),
    objectives: z.string().min(1, 'Add at least one objective'),
    activities: z.string().min(1, 'Add at least one activity'),
    results: z.string().min(1, 'Add at least one result'),
    image: z.string().min(1, 'Main image is required'),
    imageAlt: z.string().min(1, 'Image alternative text is required'),
    featured: z.boolean(),
  });
  type FormValues = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: initial?.title ?? '',
      slug: initial?.slug ?? '',
      programme: initial?.programme ?? 'horizon',
      programmeLabel: initial?.programmeLabel ?? 'Horizon Europe',
      intro: initial?.intro ?? '',
      overview: initial?.overview ?? '',
      duration: initial?.duration ?? '',
      countries: textFromList(initial?.countries ?? []),
      partners: textFromList(initial?.partners ?? []),
      objectives: textFromList(initial?.objectives ?? []),
      activities: textFromList(initial?.activities ?? []),
      results: textFromList(initial?.results ?? []),
      image: initial?.image ?? '',
      imageAlt: initial?.imageAlt ?? '',
      featured: initial?.featured ?? false,
    },
  });

  const titleValue = watch('title');
  const programmeValue = watch('programme');
  const imageValue = watch('image');

  useEffect(() => {
    if (!slugTouched && titleValue) {
      setValue('slug', slugify(titleValue), { shouldValidate: true });
    }
  }, [titleValue, slugTouched, setValue]);

  useEffect(() => {
    const label = PROGRAMMES.find((item) => item.value === programmeValue)?.label;
    if (label) setValue('programmeLabel', label, { shouldValidate: true });
  }, [programmeValue, setValue]);

  const handleImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setImageError(null);
    try {
      const { base64 } = await readImageAsBase64(file);
      setValue('image', base64, { shouldValidate: true });
    } catch (err) {
      setImageError(err instanceof Error ? err.message : 'Could not read image.');
    } finally {
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const removeImage = () => {
    setValue('image', '', { shouldValidate: true });
    setImageError(null);
  };

  const onSubmit = async (values: FormValues) => {
    const payload: ProjectInput = {
      slug: values.slug,
      title: values.title,
      programme: values.programme,
      programmeLabel: values.programmeLabel,
      intro: values.intro,
      shortDescription: values.intro,
      image: values.image,
      imageAlt: values.imageAlt,
      featured: values.featured,
      overview: values.overview,
      objectives: listFromText(values.objectives),
      activities: listFromText(values.activities),
      results: listFromText(values.results),
      duration: values.duration,
      countries: listFromText(values.countries),
      partners: listFromText(values.partners),
    };

    try {
      if (initial) {
        await projectService.updateProject(initial.id, payload);
        toast.success('Project updated successfully.');
      } else {
        await projectService.createProject(payload);
        toast.success('Project created successfully.');
      }
      navigate(ROUTES.admin.projects);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not save the project. Please try again.');
    }
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit(onSubmit)} noValidate data-testid="project-form">
      <div className="admin-form__section">
        <div className="form-grid">
          <div className={`form-field form-field--full${errors.title ? ' has-error' : ''}`}>
            <label htmlFor="p-title">
              Title <span className="req">*</span>
            </label>
            <input id="p-title" type="text" {...register('title')} data-testid="project-title-input" />
            {errors.title ? <p className="field-error">{errors.title.message}</p> : null}
          </div>

          <div className={`form-field${errors.slug ? ' has-error' : ''}`}>
            <label htmlFor="p-slug">
              Slug <span className="req">*</span>
            </label>
            <input
              id="p-slug"
              type="text"
              {...register('slug')}
              onChange={(event) => {
                setSlugTouched(true);
                setValue('slug', event.target.value, { shouldValidate: true });
              }}
              data-testid="project-slug-input"
            />
            {errors.slug ? <p className="field-error">{errors.slug.message}</p> : null}
          </div>

          <div className={`form-field${errors.programme ? ' has-error' : ''}`}>
            <label htmlFor="p-programme">
              Programme <span className="req">*</span>
            </label>
            <select id="p-programme" {...register('programme')} data-testid="project-programme-select">
              {PROGRAMMES.map((programme) => (
                <option key={programme.value} value={programme.value}>
                  {programme.label}
                </option>
              ))}
            </select>
          </div>

          <div className={`form-field${errors.programmeLabel ? ' has-error' : ''}`}>
            <label htmlFor="p-programme-label">
              Programme Label <span className="req">*</span>
            </label>
            <input id="p-programme-label" type="text" {...register('programmeLabel')} />
            {errors.programmeLabel ? <p className="field-error">{errors.programmeLabel.message}</p> : null}
          </div>

          <div className={`form-field${errors.duration ? ' has-error' : ''}`}>
            <label htmlFor="p-duration">
              Duration <span className="req">*</span>
            </label>
            <input id="p-duration" type="text" placeholder="2024 - 2027" {...register('duration')} />
            {errors.duration ? <p className="field-error">{errors.duration.message}</p> : null}
          </div>

          <div className={`form-field form-field--full${errors.intro ? ' has-error' : ''}`}>
            <label htmlFor="p-intro">
              Short Description / Intro <span className="req">*</span>
            </label>
            <textarea id="p-intro" style={{ minHeight: 90 }} {...register('intro')} />
            {errors.intro ? <p className="field-error">{errors.intro.message}</p> : null}
          </div>

          <div className={`form-field form-field--full${errors.overview ? ' has-error' : ''}`}>
            <label htmlFor="p-overview">
              Overview <span className="req">*</span>
            </label>
            <textarea id="p-overview" style={{ minHeight: 150 }} {...register('overview')} />
            {errors.overview ? <p className="field-error">{errors.overview.message}</p> : null}
          </div>
        </div>
      </div>

      <div className="admin-form__section">
        <h3 style={{ marginBottom: 'var(--space-4)', fontSize: 'var(--fs-h4)' }}>Project Details</h3>
        <div className="form-grid">
          {[
            ['countries', 'Countries'],
            ['partners', 'Partners'],
            ['objectives', 'Objectives'],
            ['activities', 'Activities'],
            ['results', 'Results'],
          ].map(([name, label]) => {
            const field = name as 'countries' | 'partners' | 'objectives' | 'activities' | 'results';
            return (
              <div key={name} className={`form-field form-field--full${errors[field] ? ' has-error' : ''}`}>
                <label htmlFor={`p-${name}`}>
                  {label} <span className="req">*</span>
                </label>
                <textarea id={`p-${name}`} {...register(field)} />
                <p className="hint">One item per line.</p>
                {errors[field] ? <p className="field-error">{errors[field]?.message}</p> : null}
              </div>
            );
          })}
        </div>
      </div>

      <div className="admin-form__section">
        <h3 style={{ marginBottom: 'var(--space-4)', fontSize: 'var(--fs-h4)' }}>Main Image</h3>
        <div className="image-upload">
          <div className="image-upload__preview">
            {imageValue ? <img src={imageValue} alt="Preview" /> : <span className="hint">No image</span>}
          </div>
          <div className="image-upload__controls">
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleImage}
              style={{ display: 'none' }}
            />
            <button type="button" className="btn btn--ghost" onClick={() => fileRef.current?.click()}>
              {imageValue ? <RefreshCw size={16} /> : <Upload size={16} />}
              <span>{imageValue ? 'Change image' : 'Choose image'}</span>
            </button>
            {imageValue ? (
              <button type="button" className="btn btn--ghost" onClick={removeImage}>
                <Trash2 size={16} /> <span>Remove</span>
              </button>
            ) : null}
            <p className="hint">JPG, JPEG, PNG or WEBP. Max 1.5 MB.</p>
            {imageError ? <p className="field-error">{imageError}</p> : null}
            {errors.image ? <p className="field-error">{errors.image.message}</p> : null}
          </div>
        </div>

        <div className={`form-field${errors.imageAlt ? ' has-error' : ''}`} style={{ marginTop: 'var(--space-5)' }}>
          <label htmlFor="p-alt">
            Image Alternative Text <span className="req">*</span>
          </label>
          <input id="p-alt" type="text" {...register('imageAlt')} />
          {errors.imageAlt ? <p className="field-error">{errors.imageAlt.message}</p> : null}
        </div>
      </div>

      <div className="admin-form__section">
        <label className="checkbox-field">
          <input type="checkbox" {...register('featured')} />
          <span>
            <strong>Featured</strong> - use this project as the highlighted project on Home.
          </span>
        </label>
      </div>

      <div className="admin-form__actions">
        <button type="submit" className="btn btn--primary" disabled={isSubmitting}>
          {initial ? 'Save changes' : 'Create project'}
        </button>
        <button type="button" className="btn btn--ghost" onClick={() => navigate(ROUTES.admin.projects)}>
          Cancel
        </button>
        {initial ? (
          <a href={ROUTES.projectDetails(initial.slug)} target="_blank" rel="noreferrer" className="btn btn--secondary">
            <Eye size={16} /> <span>Preview</span>
          </a>
        ) : null}
      </div>
    </form>
  );
}
