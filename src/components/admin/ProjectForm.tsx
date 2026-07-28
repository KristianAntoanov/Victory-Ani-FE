import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { Eye, RefreshCw, Trash2, Upload } from 'lucide-react';
import { ROUTES } from '@/constants';
import { projectService } from '@/services/projectService';
import { readImageAsBase64 } from '@/utils';
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

const schema = z.object({
  titleBg: z.string().min(1, 'Bulgarian title is required'),
  titleEn: z.string().min(1, 'English title is required'),
  programme: z.enum(['horizon', 'erasmus', 'life', 'cerv']),
  themeBg: z.string().min(1, 'Bulgarian theme is required'),
  themeEn: z.string().min(1, 'English theme is required'),
  durationBg: z.string().min(1, 'Bulgarian duration is required'),
  durationEn: z.string().min(1, 'English duration is required'),
  countriesBg: z.string().min(1, 'Bulgarian countries are required'),
  countriesEn: z.string().min(1, 'English countries are required'),
  mainActivitiesBg: z.string().min(1, 'Bulgarian main activities are required'),
  mainActivitiesEn: z.string().min(1, 'English main activities are required'),
  image: z.string(),
  isActive: z.boolean(),
});

type FormValues = z.infer<typeof schema>;

export default function ProjectForm({ initial }: ProjectFormProps) {
  const navigate = useNavigate();
  const toast = useToast();
  const fileRef = useRef<HTMLInputElement>(null);
  const [imageError, setImageError] = useState<string | null>(null);

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
      programme: initial?.programme ?? 'horizon',
      themeBg: initial?.themeBg ?? '',
      themeEn: initial?.themeEn ?? '',
      durationBg: initial?.durationBg ?? '',
      durationEn: initial?.durationEn ?? '',
      countriesBg: initial?.countriesBg ?? '',
      countriesEn: initial?.countriesEn ?? '',
      mainActivitiesBg: initial?.mainActivitiesBg ?? '',
      mainActivitiesEn: initial?.mainActivitiesEn ?? '',
      image: initial?.image ?? '',
      isActive: initial?.isActive ?? true,
    },
  });

  const imageValue = watch('image');
  const canRemoveImage = Boolean(imageValue) && (!initial?.image || imageValue !== initial.image);

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
    setValue('image', initial?.image ?? '', { shouldValidate: true });
    setImageError(null);
  };

  const onSubmit = async (values: FormValues) => {
    const selectedProgramme = PROGRAMMES.find((item) => item.value === values.programme) ?? PROGRAMMES[0];
    const payload: ProjectInput = {
      titleBg: values.titleBg,
      titleEn: values.titleEn,
      programmeBg: selectedProgramme.labelBg,
      programmeEn: selectedProgramme.labelEn,
      themeBg: values.themeBg,
      themeEn: values.themeEn,
      image: values.image,
      durationBg: values.durationBg,
      durationEn: values.durationEn,
      countriesBg: values.countriesBg,
      countriesEn: values.countriesEn,
      mainActivitiesBg: values.mainActivitiesBg,
      mainActivitiesEn: values.mainActivitiesEn,
      isActive: values.isActive,
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

          <div className={`form-field form-field--full${errors.themeBg ? ' has-error' : ''}`}>
            <label htmlFor="p-theme-bg">
              Theme BG <span className="req">*</span>
            </label>
            <textarea id="p-theme-bg" style={{ minHeight: 90 }} {...register('themeBg')} />
            {errors.themeBg ? <p className="field-error">{errors.themeBg.message}</p> : null}
          </div>

          <div className={`form-field form-field--full${errors.themeEn ? ' has-error' : ''}`}>
            <label htmlFor="p-theme-en">
              Theme EN <span className="req">*</span>
            </label>
            <textarea id="p-theme-en" style={{ minHeight: 90 }} {...register('themeEn')} />
            {errors.themeEn ? <p className="field-error">{errors.themeEn.message}</p> : null}
          </div>
        </div>
      </div>

      <div className="admin-form__section">
        <h3 style={{ marginBottom: 'var(--space-4)', fontSize: 'var(--fs-h4)' }}>Project Details</h3>
        <div className="form-grid">
          {[
            ['countriesBg', 'Countries BG'],
            ['countriesEn', 'Countries EN'],
            ['mainActivitiesBg', 'Main Activities BG'],
            ['mainActivitiesEn', 'Main Activities EN'],
          ].map(([name, label]) => {
            const field = name as 'countriesBg' | 'countriesEn' | 'mainActivitiesBg' | 'mainActivitiesEn';
            return (
              <div key={name} className={`form-field form-field--full${errors[field] ? ' has-error' : ''}`}>
                <label htmlFor={`p-${name}`}>
                  {label} <span className="req">*</span>
                </label>
                <textarea id={`p-${name}`} {...register(field)} />
                <p className="hint">Use a new line or comma to separate items when needed.</p>
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
            {canRemoveImage ? (
              <button type="button" className="btn btn--ghost" onClick={removeImage}>
                <Trash2 size={16} /> <span>Remove</span>
              </button>
            ) : null}
            <p className="hint">JPG, JPEG, PNG or WEBP. Max 1.5 MB.</p>
            {imageError ? <p className="field-error">{imageError}</p> : null}
          </div>
        </div>
      </div>

      <div className="admin-form__section">
        <label className="checkbox-field">
          <input type="checkbox" {...register('isActive')} />
          <span>
            <strong>Active</strong> - show this project on the public pages.
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
