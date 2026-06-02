import HeroSection from "@/components/home/HeroSection";
import WhyChooseSection from "@/components/home/WhyChooseSection";
import ProgramsSection from "@/components/home/ServiceSection";
import InstructorPreviewSection from "@/components/home/InstructorPreviewSection";
import LocationPreviewSection from "@/components/home/LocationPreviewSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import MonthlyCalendarSection from "@/components/home/MonthlyCalendarSection";
import FaqSection from "@/components/content/FaqSection";
import CTASection from "@/components/content/CTASection";

import {
  getClasses,
  getInstructors,
  getLocations,
  getAssetUrl,
  getTestimonials,
  getFaqs,
  getCalendarEvents,
} from "@/lib/contentful";

function mapInstructors(instructorsData: any) {
  return instructorsData.items.map((instructor: any) => {
    const avatarUrl = getAssetUrl(
      instructorsData,
      instructor.fields.image?.sys?.id,
    );

    return {
      id: instructor.sys.id,
      name: instructor.fields.title,
      rank: instructor.fields.rank,
      bio: instructor.fields.description,
      href: `/instructors/${instructor.fields.slug}`,
      image: avatarUrl
        ? {
            src: avatarUrl,
            alt: instructor.fields.title,
          }
        : undefined,
    };
  });
}

function mapServices(services: any[]) {
  return services.map((program: any) => ({
    id: program.sys.id,
    title: program.fields.title,
    age: program.fields.ageRange,
    description: program.fields.description,
    href: `/classes/${program.fields.slug}`,
  }));
}

function mapLocations(locations: any[]) {
  return locations.map((location: any) => ({
    id: location.sys.id,
    title: location.fields.title,
    description: location.fields.description,
    href: `/locations/${location.fields.slug}`,
  }));
}

function mapTestimonials(testimonials: any[]) {
  console.log(testimonials)
  return testimonials.map((testimonial: any) => ({
    id: testimonial.sys.id,
    name: testimonial.fields.title,
    rating: testimonial.fields.rating,
    testimonialDescription: testimonial.fields.description,
  }));
}

function mapFaqs(faqs: any[]) {
  return faqs.map((faq: any) => ({
    id: faq.sys.id,
    question: faq.fields.question,
    answer: faq.fields.answer,
  }));
}

function mapCalendarItems(items: any[]) {
  return items.map((item: any) => ({
    id: item.sys.id,
    title: item.fields.title,
    startDate: item.fields.startDate,
    endDate: item.fields.endDate,
    type: item.fields.type,
    description: item.fields.description,
    location: item.fields.location,
    isRecurring: item.fields.isRecurring,
    recurringDay: item.fields.recurringDay,
    recurringStartDate: item.fields.recurringStartDate,
    recurringEndDate: item.fields.recurringEndDate,
  }));
}

export default async function Home() {
  const [
    services,
    instructorsData,
    studioLocationsData,
    testimonialsData,
    faqData,
    calendarData,
  ] = await Promise.all([
    getClasses(),
    getInstructors(),
    getLocations(),
    getTestimonials(),
    getFaqs(),
    getCalendarEvents(),
  ]);

  return (
    <>
      <HeroSection />
      <WhyChooseSection />

      <ProgramsSection
        services={mapServices(services)}
        backgroundImage="/images/falcon-group.JPG"
      />

      <MonthlyCalendarSection items={mapCalendarItems(calendarData)} />

      <LocationPreviewSection locations={mapLocations(studioLocationsData)} />

      <InstructorPreviewSection instructors={mapInstructors(instructorsData)} />

      <TestimonialsSection
        testimonials={mapTestimonials(testimonialsData)}
        backgroundImage="/images/demo-happy.jpg"
      />

      <FaqSection faqs={mapFaqs(faqData)} />

      <CTASection />
    </>
  );
}
