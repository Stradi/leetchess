import { getUrlFor, PermalinkResources } from '@/utils/permalinks';
import { IConfig } from './config.types';

export default {
  navigation: [
    {
      label: 'Learn',
      href: getUrlFor(PermalinkResources.Tutorial),
      megaMenu: {
        title: 'Chess Tutorials',
        description: 'Learn chess from the beginning',
        items: [
          {
            label: 'All Tutorials',
            href: getUrlFor(PermalinkResources.Tutorial),
            description: 'Learn chess from the beginning',
          },
        ],
      },
    },
    {
      label: 'Community',
      href: getUrlFor(PermalinkResources.Community),
      megaMenu: {
        title: 'LeetChess Community',
        description: 'Join the LeetChess community',
        items: [
          {
            label: 'Discord',
            href: 'https://discord.gg/LeetChess',
            description: 'Join the LeetChess Discord server',
          },
          {
            label: 'Twitter',
            href: 'https://twitter.com/LeetChess',
            description: 'Latest updates and news about LeetChess',
          },
          {
            label: 'Reddit',
            href: 'https://www.reddit.com/r/LeetChess/',
            description: 'Join the LeetChess subreddit',
          },
          {
            label: 'YouTube',
            href: 'https://www.youtube.com',
            description: 'Special chess videos from LeetChess',
          },
        ],
      },
    },
    {
      label: 'Blog',
      href: getUrlFor(PermalinkResources.Blog),
    },
  ],
} as IConfig;
