import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { Upload, Trash2, RefreshCw, Eye } from 'lucide-react';
import { newsService } from '@/services/newsService';
import { slugify, readImageAsBase64 } from '@/utils';
import { NEWS_CATEGORIES, ROUTES } from '@/constants';
import { useToast } from '@/context/ToastContext';
import type { NewsArticle, NewsArticleInput } from '@/types';

interface NewsFormProps {
  initial?: NewsArticle;
}

export default function NewsForm({ initial }: NewsFormProps) {
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
      .refine(async (value) => newsService.isSlugUnique(value, initial?.id), 'This slug is already in use'),
    category: z.string().min(1, 'Category is required'),
    publishDate: z.string().min(1, 'Publish date is required'),
    shortDescription: z.string().min(1, 'Short description is required'),
    content: z.string().min(1, 'Full content is required'),
    image: z.string().min(1, 'Main image is required'),
    imageAlt: z.string().min(1, 'Image alternative text is required'),
    author: z.string().min(1, 'Author is required'),
    featured: z.boolean(),
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
      title: initial?.title ?? '',
      slug: initial?.slug ?? '',
      category: initial?.category ?? NEWS_CATEGORIES[0],
      publishDate: initial?.publishDate ?? new Date().toISOString().slice(0, 10),
      shortDescription: initial?.shortDescription ?? '',
      content: initial?.content ?? '',
      image: initial?.image ?? '',
      imageAlt: initial?.imageAlt ?? '',
      author: initial?.author ?? '',
      featured: initial?.featured ?? false,
      published: initial?.published ?? true,
    },
  });

  const titleValue = watch('title');
  const imageValue = watch('image');

  useEffect(() => {
    if (!slugTouched && titleValue) {
      setValue('slug', slugify(titleValue), { shouldValidate: true });
    }
  }, [titleValue, slugTouched, setValue]);

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
    const payload: NewsArticleInput = { ...values };
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
    <form className="admin-form" onSubmit={handleSubmit(onSubmit)} noValidate data-testid="news-form">
      <div className="admin-form__section">
        <div className="form-grid">
          <div className={`form-field form-field--full${errors.title ? ' has-error' : ''}`}>
            <label htmlFor="f-title">
              Title <span className="req">*</span>
            </label>
            <input id="f-title" type="text" {...register('title')} data-testid="news-title-input" />
            {errors.title ? <p className="field-error">{errors.title.message}</p> : null}
          </div>

          <div className={`form-field${errors.slug ? ' has-error' : ''}`}>
            <label htmlFor="f-slug">
              Slug <span className="req">*</span>
            </label>
            <input
              id="f-slug"
              type="text"
              {...register('slug')}
              onChange={(e) => {
                setSlugTouched(true);
                setValue('slug', e.target.value, { shouldValidate: true });
              }}
              data-testid="news-slug-input"
            />
            {errors.slug ? <p className="field-error">{errors.slug.message}</p> : null}
          </div>

          <div className={`form-field${errors.category ? ' has-error' : ''}`}>
            <label htmlFor="f-category">
              Category <span className="req">*</span>
            </label>
            <select id="f-category" {...register('category')} data-testid="news-category-select">
              {NEWS_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            {errors.category ? <p className="field-error">{errors.category.message}</p> : null}
          </div>

          <div className={`form-field${errors.publishDate ? ' has-error' : ''}`}>
            <label htmlFor="f-date">
              Publish Date <span className="req">*</span>
            </label>
            <input id="f-date" type="date" {...register('publishDate')} data-testid="news-date-input" />
            {errors.publishDate ? <p className="field-error">{errors.publishDate.message}</p> : null}
          </div>

          <div className={`form-field${errors.author ? ' has-error' : ''}`}>
            <label htmlFor="f-author">
              Author <span className="req">*</span>
            </label>
            <input id="f-author" type="text" {...register('author')} data-testid="news-author-input" />
            {errors.author ? <p className="field-error">{errors.author.message}</p> : null}
          </div>

          <div className={`form-field form-field--full${errors.shortDescription ? ' has-error' : ''}`}>
            <label htmlFor="f-short">
              Short Description <span className="req">*</span>
            </label>
            <textarea
              id="f-short"
              {...register('shortDescription')}
              style={{ minHeight: 90 }}
              data-testid="news-short-input"
            />
            {errors.shortDescription ? (
              <p className="field-error">{errors.shortDescription.message}</p>
            ) : null}
          </div>

          <div className={`form-field form-field--full${errors.content ? ' has-error' : ''}`}>
            <label htmlFor="f-content">
              Full Content <span className="req">*</span>
            </label>
            <textarea
              id="f-content"
              {...register('content')}
              style={{ minHeight: 220 }}
              data-testid="news-content-input"
            />
            <p className="hint">Separate paragraphs with a blank line.</p>
            {errors.content ? <p className="field-error">{errors.content.message}</p> : null}
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
            {errors.image ? <p className="field-error">{errors.image.message}</p> : null}
          </div>
        </div>

        <div className={`form-field${errors.imageAlt ? ' has-error' : ''}`} style={{ marginTop: 'var(--space-5)' }}>
          <label htmlFor="f-alt">
            Image Alternative Text <span className="req">*</span>
          </label>
          <input id="f-alt" type="text" {...register('imageAlt')} data-testid="news-alt-input" />
          {errors.imageAlt ? <p className="field-error">{errors.imageAlt.message}</p> : null}
        </div>
      </div>

      <div className="admin-form__section">
        <div className="switch-row">
          <label className="checkbox-field">
            <input type="checkbox" {...register('featured')} data-testid="news-featured-checkbox" />
            <span>
              <strong>Featured</strong> — show as the highlighted article on the Our Journal page.
            </span>
          </label>
          <label className="checkbox-field">
            <input type="checkbox" {...register('published')} data-testid="news-published-checkbox" />
            <span>
              <strong>Published</strong> — visible on the public Our Journal page.
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
