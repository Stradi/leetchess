import { IConfig } from "./config.types";

export default {
  navigation: [
    {
      label: "Learn",
      href: "/learn",
      megaMenu: {
        title: "Chess Tutorials",
        description: "Learn chess from the beginning",
        items: [
          {
            label: "All Tutorials",
            href: "/learn",
            description: "Learn chess from the beginning",
          },
          {
            label: "Openings",
            href: "/learn/openings",
            description: "Learn chess openings and how to play them",
          },
          {
            label: "Tactics",
            href: "/learn/tactics",
            description: "Learn chess tactics and how to use them",
          },
          {
            label: "Puzzles",
            href: "/learn/puzzles",
            description: "Improve your chess skills by solving chess puzzles",
          },
        ],
      },
    },
    {
      label: "Community",
      href: "/community",
      megaMenu: {
        title: "LeetChess Community",
        description: "Join the LeetChess community",
        items: [
          {
            label: "Discord",
            href: "https://discord.gg/LeetChess",
            description: "Join the LeetChess Discord server",
          },
          {
            label: "Twitter",
            href: "https://twitter.com/LeetChess",
            description: "Latest updates and news about LeetChess",
          },
          {
            label: "Reddit",
            href: "https://www.reddit.com/r/LeetChess/",
            description: "Join the LeetChess subreddit",
          },
          {
            label: "YouTube",
            href: "https://www.youtube.com",
            description: "Special chess videos from LeetChess",
          },
        ],
      },
    },
    {
      label: "Blog",
      href: "/blog",
    },
  ],
} as IConfig;
