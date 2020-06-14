import polygon from './polygon.repository';

type RepositoryTypes = 'polygon';

export const POLYGON = 'polygon';

export default {
  with(repo: RepositoryTypes) {
    switch (repo) {
      case POLYGON:
        return polygon;
    }
  },
};
