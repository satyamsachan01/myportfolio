import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProject } from '../data/projects';
import { profile } from '../data/profile';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { ProjectModal } from '../components/projects/ProjectModal';
import { projectTitle } from '../utils/categories';

export function ProjectRoute() {
  const { slug = '' } = useParams();
  const navigate = useNavigate();
  const project = getProject(slug);

  useDocumentMeta({
    title: project ? projectTitle(project, profile.name) : `Project not found | ${profile.name}`,
    description: project?.summary ?? 'This project could not be found in the vault.',
    path: `/projects/${slug}`,
    image: project?.images[0]?.src,
  });

  const close = useCallback(() => {
    // Return to where the visitor came from inside the site; otherwise go home.
    if ((window.history.state?.idx ?? 0) > 0) navigate(-1);
    else navigate('/projects', { preventScrollReset: true });
  }, [navigate]);

  return <ProjectModal project={project} slug={slug} onClose={close} />;
}
