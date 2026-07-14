import React from "react";
import type { IconType } from "react-icons";
import {
  SiGo,
  SiPython,
  SiTypescript,
  SiJavascript,
  SiGnubash,
  SiReact,
  SiNextdotjs,
  SiAngular,
  SiHtml5,
  SiCss,
  SiSass,
  SiTailwindcss,
  SiGin,
  SiNodedotjs,
  SiFlask,
  SiNestjs,
  SiGraphql,
  SiSocketdotio,
  SiPostgresql,
  SiRedis,
  SiDocker,
  SiGithubactions,
  SiJenkins,
  SiNginx,
  SiFirebase,
  SiLinux,
  SiGit,
  SiFfmpeg,
  SiMinio,
  SiTanstack,
} from "react-icons/si";

/** Custom SVG for NATS.io */
export const SiNats: IconType = (props) =>
  React.createElement(
    "svg",
    {
      stroke: "currentColor",
      fill: "none",
      strokeWidth: "0",
      viewBox: "0 0 256 266",
      height: "1em",
      width: "1em",
      xmlns: "http://www.w3.org/2000/svg",
      ...props,
    },
    React.createElement(
      "g",
      null,
      React.createElement("polygon", { fill: "#34A574", points: "128 -1.35040045e-14 256 -1.35040045e-14 256 103.768374 128 103.768374" }),
      React.createElement("polygon", { fill: "#27AAE1", points: "0 -1.35040045e-14 128 -1.35040045e-14 128 103.768374 0 103.768374" }),
      React.createElement("polygon", { fill: "#8DC63F", points: "256 103.8634 256 207.631774 171.806978 207.631774 171.806978 265.027468 109.184855 207.821826 128 207.061618 128 103.8634" }),
      React.createElement("polygon", { fill: "#375C93", points: "128 103.8634 128 224.540533 109.184855 207.821826 0 207.821826 0 103.8634" }),
      React.createElement("polygon", { fill: "#FFFFFF", points: "181.024499 134.176689 181.024499 48.2731997 211.622866 48.2731997 211.622866 159.358575 165.250186 159.358575 71.6495917 71.9346696 71.6495917 159.453601 40.956199 159.453601 40.956199 48.2731997 88.9443207 48.2731997 181.024499 134.176689" })
    )
  );

/** Custom SVG for Valkey */
export const SiValkey: IconType = (props) =>
  React.createElement(
    "svg",
    {
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0",
      viewBox: "0 0 64 73",
      height: "1em",
      width: "1em",
      xmlns: "http://www.w3.org/2000/svg",
      ...props,
    },
    React.createElement(
      "g",
      null,
      React.createElement("path", { d: "M 13.482285 60.694962 L 0.998384 52.884399 L 0.998384 19.502914 L 31.527868 2.001205 L 61.317604 19.532024 L 61.317604 54.64489 L 31.054855 71.68927 L 20.548372 65.115807 L 20.548372 51.041328 L 20.548372 49.119896 L 14.851504 45.555508 L 14.851504 27.453159 L 31.346497 17.99712 L 47.464485 27.482262 L 47.464485 46.451157 L 34.703495 53.638138 L 34.703495 45.998573 C 38.52874 44.52552 41.274452 40.739189 41.274452 36.270489 C 41.274452 30.510658 36.712814 25.88438 31.158138 25.88438 C 25.603172 25.88438 21.041817 30.510658 21.041817 36.270489 C 21.041817 40.739189 23.787249 44.52552 27.612494 45.998573 L 27.612494 60.473576 L 31.261133 62.756348 L 53.635483 50.15464 L 53.635483 23.924595 L 31.477489 10.884869 L 8.680504 23.953705 L 8.680504 48.628967 L 13.482285 51.633297 L 13.482285 60.694962 Z M 31.158138 31.498383 C 33.671822 31.498383 35.660439 33.664162 35.660439 36.270489 C 35.660439 38.876804 33.671822 41.042587 31.158138 41.042587 C 28.644447 41.042587 26.655558 38.876804 26.655558 36.270489 C 26.655558 33.664162 28.644447 31.498383 31.158138 31.498383 Z" })
    )
  );

/** Custom SVG for WebSockets */
export const SiWebsockets: IconType = (props) =>
  React.createElement(
    "svg",
    {
      stroke: "currentColor",
      fill: "none",
      strokeWidth: "2.5",
      viewBox: "0 0 24 24",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      height: "1em",
      width: "1em",
      xmlns: "http://www.w3.org/2000/svg",
      ...props,
    },
    React.createElement("path", { d: "m7 15-5-5 5-5" }),
    React.createElement("path", { d: "m17 9 5 5-5 5" }),
    React.createElement("path", { d: "M22 14H2" })
  );

/** Simple Icons components keyed by the `icon` names used in content/skills.json. */
export const skillIconMap: Record<string, IconType> = {
  SiGo,
  SiPython,
  SiTypescript,
  SiJavascript,
  SiGnubash,
  SiReact,
  SiNextdotjs,
  SiAngular,
  SiHtml5,
  SiCss,
  SiSass,
  SiTailwindcss,
  SiGin,
  SiNodedotjs,
  SiFlask,
  SiNestjs,
  SiGraphql,
  SiSocketdotio,
  SiPostgresql,
  SiRedis,
  SiDocker,
  SiGithubactions,
  SiJenkins,
  SiNginx,
  SiFirebase,
  SiLinux,
  SiGit,
  SiFfmpeg,
  SiMinio,
  SiTanstack,
  SiNats,
  SiValkey,
  SiWebsockets,
};
