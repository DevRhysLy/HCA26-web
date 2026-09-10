# Image-to-code analysis

Comps live in `docs/design-audit/comps/`.

## Hero (`hca-comp-hero.png`)

Warm cream page, 80px white header, wordmark with Australia in blue, text nav, solid blue trial button, red/blue hairline under the header. Two-column hero: serif headline in two lines, short supporting sentence, two CTAs, three stats. Large photo on the right with 16px radius. No dots, pills on photos, or mesh blobs.

Implemented in `HeroSection.tsx` and `Header.tsx`.

## Why choose (`hca-comp-why-choose.png`)

Zigzag photo chapters plus two supporting text rows. No 01/02 cards.

Implemented in `WhyChooseSection.tsx` with `demo-happy.jpg` and `falcon-group.JPG`.

## Programs (`hca-comp-programs.png`)

Horizontal rail of simple white cards: title, red age line, body, text link. Extra dashboard chrome in the generated frame was ignored.

Implemented in `ServiceSection.tsx`.

## Locations (`hca-comp-locations.png`)

Wide photo-plus-copy rows, not a three-up icon grid.

Implemented in `LocationPreviewSection.tsx`.

## CTA (`hca-comp-cta.png`)

Full-width blue panel, white headline, inverse buttons.

Implemented in `CTASection.tsx` with `tone="onDark"`.

## Class detail (`hca-comp-class-detail.png`)

Cream canvas. Breadcrumb, red `Class` eyebrow, serif H1, optional dek, red age fact, Korea bar, blue trial button plus white timetable button. Framed photo on the right, no overlay. Body on the left, one white At a glance card on the right (locations, next sessions, full timetable link). Generated type in the comp is garbled; implement with real Contentful copy.

## Location detail (`hca-comp-location-detail.png`)

Same header recipe with address as the fact and Get Directions as the secondary button. At a glance holds classes, instructors, and next sessions. Map band is quiet: address, embed, directions. No second "Find Us" heading stack.

## Instructor and about headers (`hca-comp-article-header.png`)

Instructor: circular portrait, `Instructor` eyebrow, name, rank, one trial button, collapsed bio, At a glance. About: `About` eyebrow, title, framed landscape photo, 65ch article, no aside.
