import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { Upload, Trash2, RefreshCw, Eye } from 'lucide-react';
import { newsService } from '@/services/newsService';
import { readImageAsBase64 } from '@/utils';
import { ROUTES } from '@/constants';
import { useToast } from '@/context/ToastContext';
import type { NewsArticle, NewsArticleInput } from '@/types';

interface NewsFormProps {
  initial?: NewsArticle;
}

export default function NewsForm({ initial }: NewsFormProps) {
  const navigate = useNavigate();
  const toast = useToast();
  const fileRef = useRef<HTMLInputElement>(null);
  const [imageError, setImageError] = useState<string | null>(null);

  const schema = z.object({
    titleBg: z.string().min(1, 'Bulgarian title is required'),
    titleEn: z.string().min(1, 'English title is required'),
    publishDate: z.string().optional(),
    summaryBg: z.string().min(1, 'Bulgarian short description is required'),
    summaryEn: z.string().min(1, 'English short description is required'),
    contentBg: z.string().min(1, 'Bulgarian content is required'),
    contentEn: z.string().min(1, 'English content is required'),
    image: z.string().optional(),
    published: z.boolean(),
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
      publishDate: initial?.publishDate ?? new Date().toISOString().slice(0, 10),
      summaryBg: initial?.summaryBg ?? '',
      summaryEn: initial?.summaryEn ?? '',
      contentBg: initial?.contentBg ?? '',
      contentEn: initial?.contentEn ?? '',
      image: initial?.image ?? '',
      published: initial?.published ?? true,
    },
  });

  const imageValue = watch('image');

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
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
    const payload: NewsArticleInput = {
      titleBg: values.titleBg,
      titleEn: values.titleEn,
      summaryBg: values.summaryBg,
      summaryEn: values.summaryEn,
      contentBg: values.contentBg,
      contentEn: values.contentEn,
      publishDate: values.publishDate,
      published: values.published,
      image: values.image,
    };
    try {
      if (initial) {
        await newsService.updateNews(initial.id, payload);
        toast.success('Article updated successfully.');
      } else {
        await newsService.createNews(payload);
        toast.success('Article created successfully.');
      }
      navigate(ROUTES.admin.news);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not save the article. Please try again.');
    }
  };

  return (
    <form className="admin-form admin-form--news" onSubmit={handleSubmit(onSubmit)} noValidate data-testid="news-form">
      <div className="admin-form__section">
        <div className="form-grid form-grid--news">
          <div className={`form-field form-field--title${errors.titleBg ? ' has-error' : ''}`}>
            <label htmlFor="f-title-bg">
              Title BG <span className="req">*</span>
            </label>
            <input id="f-title-bg" type="text" {...register('titleBg')} data-testid="news-title-bg-input" />
            {errors.titleBg ? <p className="field-error">{errors.titleBg.message}</p> : null}
          </div>

          <div className={`form-field form-field--title${errors.titleEn ? ' has-error' : ''}`}>
            <label htmlFor="f-title-en">
              Title EN <span className="req">*</span>
            </label>
            <input id="f-title-en" type="text" {...register('titleEn')} data-testid="news-title-en-input" />
            {errors.titleEn ? <p className="field-error">{errors.titleEn.message}</p> : null}
          </div>

          <div className={`form-field form-field--date${errors.publishDate ? ' has-error' : ''}`}>
            <label htmlFor="f-date">
              Publish Date
            </label>
            <input id="f-date" type="date" {...register('publishDate')} data-testid="news-date-input" />
            {errors.publishDate ? <p className="field-error">{errors.publishDate.message}</p> : null}
          </div>

          <div className={`form-field form-field--summary${errors.summaryBg ? ' has-error' : ''}`}>
            <label htmlFor="f-summary-bg">
              Short Description BG <span className="req">*</span>
            </label>
            <textarea
              id="f-summary-bg"
              {...register('summaryBg')}
              style={{ minHeight: 72 }}
              data-testid="news-summary-bg-input"
            />
            {errors.summaryBg ? <p className="field-error">{errors.summaryBg.message}</p> : null}
          </div>

          <div className={`form-field form-field--summary${errors.summaryEn ? ' has-error' : ''}`}>
            <label htmlFor="f-summary-en">
              Short Description EN <span className="req">*</span>
            </label>
            <textarea
              id="f-summary-en"
              {...register('summaryEn')}
              style={{ minHeight: 72 }}
              data-testid="news-summary-en-input"
            />
            {errors.summaryEn ? <p className="field-error">{errors.summaryEn.message}</p> : null}
          </div>

          <div className={`form-field form-field--content${errors.contentBg ? ' has-error' : ''}`}>
            <label htmlFor="f-content-bg">
              Full Content BG <span className="req">*</span>
            </label>
            <textarea
              id="f-content-bg"
              {...register('contentBg')}
              style={{ minHeight: 150 }}
              data-testid="news-content-bg-input"
            />
            <p className="hint">Separate paragraphs with a blank line.</p>
            {errors.contentBg ? <p className="field-error">{errors.contentBg.message}</p> : null}
          </div>

          <div className={`form-field form-field--content${errors.contentEn ? ' has-error' : ''}`}>
            <label htmlFor="f-content-en">
              Full Content EN <span className="req">*</span>
            </label>
            <textarea
              id="f-content-en"
              {...register('contentEn')}
              style={{ minHeight: 150 }}
              data-testid="news-content-en-input"
            />
            <p className="hint">Separate paragraphs with a blank line.</p>
            {errors.contentEn ? <p className="field-error">{errors.contentEn.message}</p> : null}
          </div>
        </div>
      </div>

      <div className="admin-form__section">
        <h3 style={{ marginBottom: 'var(--space-4)', fontSize: 'var(--fs-h4)' }}>Main Image</h3>
        <div className="image-upload">
          <div className="image-upload__preview">
            {imageValue ? (
              <img src={imageValue} alt="Preview" data-testid="news-image-preview" />
            ) : (
              <span className="hint">No image</span>
            )}
          </div>
          <div className="image-upload__controls">
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleImage}
              style={{ display: 'none' }}
              data-testid="news-image-file"
            />
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => fileRef.current?.click()}
              data-testid="news-image-choose"
            >
              {imageValue ? <RefreshCw size={16} /> : <Upload size={16} />}
              <span>{imageValue ? 'Change image' : 'Choose image'}</span>
            </button>
            {imageValue ? (
              <button
                type="button"
                className="btn btn--ghost"
                onClick={removeImage}
                data-testid="news-image-remove"
              >
                <Trash2 size={16} /> <span>Remove</span>
              </button>
            ) : null}
            <p className="hint">JPG, JPEG, PNG or WEBP. Max 1.5 MB.</p>
            {imageError ? <p className="field-error">{imageError}</p> : null}
          </div>
        </div>
      </div>

      <div className="admin-form__section">
        <div className="switch-row">
          <label className="checkbox-field">
            <input type="checkbox" {...register('published')} data-testid="news-published-checkbox" />
            <span>
              <strong>Active</strong> - visible on the public Our Journal page.
            </span>
          </label>
        </div>
      </div>

      <div className="admin-form__actions">
        <button type="submit" className="btn btn--primary" disabled={isSubmitting} data-testid="news-save-button">
          {initial ? 'Save changes' : 'Create article'}
        </button>
        <button
          type="button"
          className="btn btn--ghost"
          onClick={() => navigate(ROUTES.admin.news)}
          data-testid="news-cancel-button"
        >
          Cancel
        </button>
        {initial ? (
          <a
            href={ROUTES.newsDetails(initial.slug)}
            target="_blank"
            rel="noreferrer"
            className="btn btn--secondary"
            data-testid="news-preview-link"
          >
            <Eye size={16} /> <span>Preview</span>
          </a>
        ) : null}
      </div>
    </form>
  );
}
