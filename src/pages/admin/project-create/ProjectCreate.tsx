import ProjectForm from '@/components/admin/ProjectForm';
import styles from './ProjectCreate.module.css';

export default function ProjectCreate() {
  return (
    <div data-testid="admin-project-create">
      <p className={styles.description}>
        Add a new project. It will be saved through the backend API and shown on the
        public Projects page.
      </p>
      <ProjectForm />
    </div>
  );
}
