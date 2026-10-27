/**
 * Blog tags -> the Zenoh reference page that covers the same ground, so posts
 * link into /zenoh and the Zenoh pages link back to the writing. First match
 * wins per page; a post gets every distinct page its tags map to.
 */
const zenohPages = [
  { tags: ["ros2"], href: "/zenoh/ros2", label: "Zenoh for ROS 2", desc: "How Zenoh carries ROS 2 traffic from robot to fleet to cloud." },
  { tags: ["dds"], href: "/zenoh/dds-alternative", label: "Zenoh as a DDS alternative", desc: "Where Zenoh departs from DDS, and why." },
  { tags: ["zenoh", "mqtt", "protocols", "distributed-systems", "middleware"], href: "/zenoh", label: "Zenoh overview", desc: "The protocol, its numbers, and where to start." },
] as const;

export type ZenohLink = { href: string; label: string; desc: string };

export function zenohPagesForTags(tags: readonly string[] = []): ZenohLink[] {
  const set = new Set(tags);
  return zenohPages
    .filter((p) => p.tags.some((t) => set.has(t)))
    .map(({ href, label, desc }) => ({ href, label, desc }));
}

/** The tags whose posts a given Zenoh page should list under "From the blog". */
export function tagsForZenohPage(href: string): readonly string[] {
  return zenohPages.find((p) => p.href === href)?.tags ?? [];
}
