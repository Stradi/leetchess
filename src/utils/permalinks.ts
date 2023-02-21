export enum PermalinkResources {
  Tutorial = "tutorial",
  LearningPath = "learning-path",
  Tag = "tag",
  Community = "community",
  Blog = "blog",
}

export function getUrlFor(
  resource: PermalinkResources,
  path: string[] = [],
  query: Record<string, string> = {}
) {
  function getQueryString(query: Record<string, string>) {
    const queryString = Object.entries(query)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
    return queryString ? `?${queryString}` : "";
  }

  const queryString = getQueryString(query);
  const pathString = path.length ? "/" + path.join("/") : "";

  switch (resource) {
    case PermalinkResources.Tutorial:
      return `/learn${pathString}${queryString}`;
    case PermalinkResources.Tag:
      return `/learn${queryString}`;
    case PermalinkResources.LearningPath:
      return `/paths${pathString}${queryString}`;
    case PermalinkResources.Community:
      return `/community${pathString}${queryString}`;
    case PermalinkResources.Blog:
      return `/blog${pathString}${queryString}`;

    default:
      throw new Error(`Invalid resource: ${resource}`);
  }
}
