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

const PROGRAMMES: Array<{ value: ProgrammeKey; labelBg: string; labelEn: string }> = [
  { value: 'horizon', labelBg: 'Horizon Europe', labelEn: 'Horizon Europe' },
  { value: 'erasmus', labelBg: 'Erasmus+', labelEn: 'Erasmus+' },
  { value: 'life', labelBg: 'LIFE Programme', labelEn: 'LIFE Programme' },
  { value: 'cerv', labelBg: 'CERV', labelEn: 'CERV' },
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
    titleBg: z.string().min(1, 'Bulgarian title is required'),
    titleEn: z.string().min(1, 'English title is required'),
    slug: z
      .string()
      .min(1, 'Slug is required')
      .regex(/^[a-z0-9-]+$/, 'Use lowercase latin letters, numbers and dashes only')
      .refine(async (value) => projectService.isSlugUnique(value, initial?.id), 'This slug is already in use'),
    programme: z.enum(['horizon', 'erasmus', 'life', 'cerv']),
    programmeLabelBg: z.string().min(1, 'Bulgarian programme label is required'),
    programmeLabelEn: z.string().min(1, 'English programme label is required'),
    introBg: z.string().min(1, 'Bulgarian intro is required'),
    introEn: z.string().min(1, 'English intro is required'),
    overviewBg: z.string().min(1, 'Bulgarian overview is required'),
    overviewEn: z.string().min(1, 'English overview is required'),
    durationBg: z.string().min(1, 'Bulgarian duration is required'),
    durationEn: z.string().min(1, 'English duration is required'),
    countriesBg: z.string().min(1, 'Add at least one Bulgarian country'),
    countriesEn: z.string().min(1, 'Add at least one English country'),
    partnersBg: z.string().min(1, 'Add at least one Bulgarian partner'),
    partnersEn: z.string().min(1, 'Add at least one English partner'),
    objectivesBg: z.string().min(1, 'Add at least one Bulgarian objective'),
    objectivesEn: z.string().min(1, 'Add at least one English objective'),
    activitiesBg: z.string().min(1, 'Add at least one Bulgarian activity'),
    activitiesEn: z.string().min(1, 'Add at least one English activity'),
    resultsBg: z.string().min(1, 'Add at least one Bulgarian result'),
    resultsEn: z.string().min(1, 'Add at least one English result'),
    image: z.string().min(1, 'Main image is required'),
    imageAltBg: z.string().min(1, 'Bulgarian image alternative text is required'),
    imageAltEn: z.string().min(1, 'English image alternative text is required'),
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
      titleBg: initial?.titleBg ?? '',
      titleEn: initial?.titleEn ?? '',
      slug: initial?.slug ?? '',
      programme: initial?.programme ?? 'horizon',
      programmeLabelBg: initial?.programmeLabelBg ?? 'Horizon Europe',
      programmeLabelEn: initial?.programmeLabelEn ?? 'Horizon Europe',
      introBg: initial?.introBg ?? '',
      introEn: initial?.introEn ?? '',
      overviewBg: initial?.overviewBg ?? '',
      overviewEn: initial?.overviewEn ?? '',
      durationBg: initial?.durationBg ?? '',
      durationEn: initial?.durationEn ?? '',
      countriesBg: textFromList(initial?.countriesBg ?? []),
      countriesEn: textFromList(initial?.countriesEn ?? []),
      partnersBg: textFromList(initial?.partnersBg ?? []),
      partnersEn: textFromList(initial?.partnersEn ?? []),
      objectivesBg: textFromList(initial?.objectivesBg ?? []),
      objectivesEn: textFromList(initial?.objectivesEn ?? []),
      activitiesBg: textFromList(initial?.activitiesBg ?? []),
      activitiesEn: textFromList(initial?.activitiesEn ?? []),
      resultsBg: textFromList(initial?.resultsBg ?? []),
      resultsEn: textFromList(initial?.resultsEn ?? []),
      image: initial?.image ?? '',
      imageAltBg: initial?.imageAltBg ?? '',
      imageAltEn: initial?.imageAltEn ?? '',
      featured: initial?.featured ?? false,
    },
  });

  const titleValue = watch('titleEn') || watch('titleBg');
  const programmeValue = watch('programme');
  const imageValue = watch('image');

  useEffect(() => {
    if (!slugTouched && titleValue) {
      setValue('slug', slugify(titleValue), { shouldValidate: true });
    }
  }, [titleValue, slugTouched, setValue]);

  useEffect(() => {
    const selected = PROGRAMMES.find((item) => item.value === programmeValue);
    if (selected) {
      setValue('programmeLabelBg', selected.labelBg, { shouldValidate: true });
      setValue('programmeLabelEn', selected.labelEn, { shouldValidate: true });
    }
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
      titleBg: values.titleBg,
      titleEn: values.titleEn,
      title: values.titleEn || values.titleBg,
      programme: values.programme,
      programmeBg: values.programme,
      programmeEn: values.programme,
      programmeLabelBg: values.programmeLabelBg,
      programmeLabelEn: values.programmeLabelEn,
      programmeLabel: values.programmeLabelEn || values.programmeLabelBg,
      introBg: values.introBg,
      introEn: values.introEn,
      intro: values.introEn || values.introBg,
      shortDescriptionBg: values.introBg,
      shortDescriptionEn: values.introEn,
      shortDescription: values.introEn || values.introBg,
      image: values.image,
      imageAltBg: values.imageAltBg,
      imageAltEn: values.imageAltEn,
      imageAlt: values.imageAltEn || values.imageAltBg,
      featured: values.featured,
      overviewBg: values.overviewBg,
      overviewEn: values.overviewEn,
      overview: values.overviewEn || values.overviewBg,
      objectivesBg: listFromText(values.objectivesBg),
      objectivesEn: listFromText(values.objectivesEn),
      objectives: listFromText(values.objectivesEn || values.objectivesBg),
      activitiesBg: listFromText(values.activitiesBg),
      activitiesEn: listFromText(values.activitiesEn),
      activities: listFromText(values.activitiesEn || values.activitiesBg),
      resultsBg: listFromText(values.resultsBg),
      resultsEn: listFromText(values.resultsEn),
      results: listFromText(values.resultsEn || values.resultsBg),
      durationBg: values.durationBg,
      durationEn: values.durationEn,
      duration: values.durationEn || values.durationBg,
      countriesBg: listFromText(values.countriesBg),
      countriesEn: listFromText(values.countriesEn),
      countries: listFromText(values.countriesEn || values.countriesBg),
      partnersBg: listFromText(values.partnersBg),
      partnersEn: listFromText(values.partnersEn),
      partners: listFromText(values.partnersEn || values.partnersBg),
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
          <div className={`form-field${errors.titleBg ? ' has-error' : ''}`}>
            <label htmlFor="p-title-bg">
              Title BG <span className="req">*</span>
            </label>
            <input id="p-title-bg" type="text" {...register('titleBg')} data-testid="project-title-bg-input" />
            {errors.titleBg ? <p className="field-error">{errors.titleBg.message}</p> : null}
          </div>

          <div className={`form-field${errors.titleEn ? ' has-error' : ''}`}>
            <label htmlFor="p-title-en">
              Title EN <span className="req">*</span>
            </label>
            <input id="p-title-en" type="text" {...register('titleEn')} data-testid="project-title-en-input" />
            {errors.titleEn ? <p className="field-error">{errors.titleEn.message}</p> : null}
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
                  {programme.labelEn}
                </option>
              ))}
            </select>
          </div>

          <div className={`form-field${errors.programmeLabelBg ? ' has-error' : ''}`}>
            <label htmlFor="p-programme-label-bg">
              Programme Label BG <span className="req">*</span>
            </label>
            <input id="p-programme-label-bg" type="text" {...register('programmeLabelBg')} />
            {errors.programmeLabelBg ? <p className="field-error">{errors.programmeLabelBg.message}</p> : null}
          </div>

          <div className={`form-field${errors.programmeLabelEn ? ' has-error' : ''}`}>
            <label htmlFor="p-programme-label-en">
              Programme Label EN <span className="req">*</span>
            </label>
            <input id="p-programme-label-en" type="text" {...register('programmeLabelEn')} />
            {errors.programmeLabelEn ? <p className="field-error">{errors.programmeLabelEn.message}</p> : null}
          </div>

          <div className={`form-field${errors.durationBg ? ' has-error' : ''}`}>
            <label htmlFor="p-duration-bg">
              Duration BG <span className="req">*</span>
            </label>
            <input id="p-duration-bg" type="text" placeholder="2024 - 2027" {...register('durationBg')} />
            {errors.durationBg ? <p className="field-error">{errors.durationBg.message}</p> : null}
          </div>

          <div className={`form-field${errors.durationEn ? ' has-error' : ''}`}>
            <label htmlFor="p-duration-en">
              Duration EN <span className="req">*</span>
            </label>
            <input id="p-duration-en" type="text" placeholder="2024 - 2027" {...register('durationEn')} />
            {errors.durationEn ? <p className="field-error">{errors.durationEn.message}</p> : null}
          </div>

          <div className={`form-field form-field--full${errors.introBg ? ' has-error' : ''}`}>
            <label htmlFor="p-intro-bg">
              Short Description / Intro BG <span className="req">*</span>
            </label>
            <textarea id="p-intro-bg" style={{ minHeight: 90 }} {...register('introBg')} />
            {errors.introBg ? <p className="field-error">{errors.introBg.message}</p> : null}
          </div>

          <div className={`form-field form-field--full${errors.introEn ? ' has-error' : ''}`}>
            <label htmlFor="p-intro-en">
              Short Description / Intro EN <span className="req">*</span>
            </label>
            <textarea id="p-intro-en" style={{ minHeight: 90 }} {...register('introEn')} />
            {errors.introEn ? <p className="field-error">{errors.introEn.message}</p> : null}
          </div>

          <div className={`form-field form-field--full${errors.overviewBg ? ' has-error' : ''}`}>
            <label htmlFor="p-overview-bg">
              Overview BG <span className="req">*</span>
            </label>
            <textarea id="p-overview-bg" style={{ minHeight: 150 }} {...register('overviewBg')} />
            {errors.overviewBg ? <p className="field-error">{errors.overviewBg.message}</p> : null}
          </div>

          <div className={`form-field form-field--full${errors.overviewEn ? ' has-error' : ''}`}>
            <label htmlFor="p-overview-en">
              Overview EN <span className="req">*</span>
            </label>
            <textarea id="p-overview-en" style={{ minHeight: 150 }} {...register('overviewEn')} />
            {errors.overviewEn ? <p className="field-error">{errors.overviewEn.message}</p> : null}
          </div>
        </div>
      </div>

      <div className="admin-form__section">
        <h3 style={{ marginBottom: 'var(--space-4)', fontSize: 'var(--fs-h4)' }}>Project Details</h3>
        <div className="form-grid">
          {[
            ['countriesBg', 'Countries BG'],
            ['countriesEn', 'Countries EN'],
            ['partnersBg', 'Partners BG'],
            ['partnersEn', 'Partners EN'],
            ['objectivesBg', 'Objectives BG'],
            ['objectivesEn', 'Objectives EN'],
            ['activitiesBg', 'Activities BG'],
            ['activitiesEn', 'Activities EN'],
            ['resultsBg', 'Results BG'],
            ['resultsEn', 'Results EN'],
          ].map(([name, label]) => {
            const field = name as
              | 'countriesBg'
              | 'countriesEn'
              | 'partnersBg'
              | 'partnersEn'
              | 'objectivesBg'
              | 'objectivesEn'
              | 'activitiesBg'
              | 'activitiesEn'
              | 'resultsBg'
              | 'resultsEn';
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

        <div className="form-grid" style={{ marginTop: 'var(--space-5)' }}>
          <div className={`form-field${errors.imageAltBg ? ' has-error' : ''}`}>
            <label htmlFor="p-alt-bg">
              Image Alternative Text BG <span className="req">*</span>
            </label>
            <input id="p-alt-bg" type="text" {...register('imageAltBg')} />
            {errors.imageAltBg ? <p className="field-error">{errors.imageAltBg.message}</p> : null}
          </div>

          <div className={`form-field${errors.imageAltEn ? ' has-error' : ''}`}>
            <label htmlFor="p-alt-en">
              Image Alternative Text EN <span className="req">*</span>
            </label>
            <input id="p-alt-en" type="text" {...register('imageAltEn')} />
            {errors.imageAltEn ? <p className="field-error">{errors.imageAltEn.message}</p> : null}
          </div>
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
