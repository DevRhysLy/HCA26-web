import HeroSection from "@/components/home/HeroSection";
import WhyChooseSection from "@/components/home/WhyChooseSection";
import ProgramsSection from "@/components/home/ServiceSection";
import InstructorPreviewSection from "@/components/home/InstructorPreviewSection";
import LocationPreviewSection from "@/components/home/LocationPreviewSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import MonthlyCalendarSection from "@/components/home/MonthlyCalendarSection";
import FaqSection from "@/components/content/FaqSection";
import CTASection from "@/components/content/CTASection";
import RevealOnView from "@/components/ui/RevealOnView";

import {
  getClasses,
  getInstructors,
  getLocations,
  resolveEntryImage,
  getTestimonials,
  getFaqs,
  getCalendarEvents,
  getWeeklyThemes,
} from "@/lib/contentful";
import {
  sortInstructorsByRank,
  mapFaqs,
  mapCalendarEvents,
  mapWeeklyThemes,
} from "@/lib/contentfulMappers";

function mapInstructors(instructorsData: any) {
  return sortInstructorsByRank(instructorsData.items).map((instructor: any) => ({
    id: instructor.sys.id,
    name: instructor.fields.title,
    rank: instructor.fields.rank,
    bio: instructor.fields.description,
    href: `/instructors/${instructor.fields.slug}`,
    image: {
      src: resolveEntryImage(instructorsData, instructor, "instructor"),
      alt: instructor.fields.title,
    },
  }));
}

function mapServices(classesData: any) {
  return classesData.items.map((program: any) => ({
    id: program.sys.id,
    title: program.fields.title,
    age: program.fields.ageRange,
    description: program.fields.description,
    href: `/classes/${program.fields.slug}`,
    image: {
      src: resolveEntryImage(classesData, program, "class"),
      alt: program.fields.title,
    },
  }));
}

function mapLocations(locationsData: any) {
  return locationsData.items.map((location: any) => ({
    id: location.sys.id,
    title: location.fields.title,
    description: location.fields.description,
    href: `/locations/${location.fields.slug}`,
    image: {
      src: resolveEntryImage(locationsData, location, "location"),
      alt: location.fields.title,
    },
  }));
}

function mapTestimonials(testimonials: any[]) {
  return testimonials.map((testimonial: any) => ({
    id: testimonial.sys.id,
    name: testimonial.fields.title,
    rating: testimonial.fields.rating,
    testimonialDescription: testimonial.fields.description,
  }));
}

export default async function Home() {
  const [
    classesData,
    instructorsData,
    locationsData,
    testimonialsData,
    faqData,
    calendarData,
    themesData,
  ] = await Promise.all([
    getClasses(),
    getInstructors(),
    getLocations(),
    getTestimonials(),
    getFaqs(),
    getCalendarEvents(),
    getWeeklyThemes(),
  ]);

  return (
    <>
      <HeroSection />
      <RevealOnView>
        <WhyChooseSection />
      </RevealOnView>

      <RevealOnView>
        <ProgramsSection services={mapServices(classesData)} />
      </RevealOnView>

      <RevealOnView>
        <MonthlyCalendarSection
          pageHref="/calendar"
          themes={mapWeeklyThemes(themesData)}
          events={mapCalendarEvents(calendarData)}
        />
      </RevealOnView>

      <RevealOnView>
        <LocationPreviewSection locations={mapLocations(locationsData)} />
      </RevealOnView>

      <RevealOnView>
        <InstructorPreviewSection instructors={mapInstructors(instructorsData)} />
      </RevealOnView>

      <RevealOnView>
        <TestimonialsSection testimonials={mapTestimonials(testimonialsData)} />
      </RevealOnView>

      <RevealOnView>
        <FaqSection faqs={mapFaqs(faqData)} />
      </RevealOnView>

      <RevealOnView>
        <CTASection />
      </RevealOnView>
    </>
  );
}
