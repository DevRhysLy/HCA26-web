module.exports = function (migration) {
  function createCommonFields(contentType) {
    contentType.createField("title").name("Title").type("Symbol").required(true);
    contentType.createField("slug").name("Slug").type("Symbol").required(true);
    contentType.createField("description").name("Description").type("Text");
    contentType.createField("body").name("Body").type("Text");
    contentType.createField("image").name("Image").type("Link").linkType("Asset");
  }

  const location = migration.createContentType("location").name("Location");
  createCommonFields(location);
  location.createField("address").name("Address").type("Symbol");
  location.createField("googleMapsEmbedUrl").name("Google Maps Embed URL").type("Text");

  const instructor = migration.createContentType("instructor").name("Instructor");
  createCommonFields(instructor);
  instructor.createField("rank").name("Rank").type("Symbol");

  const martialClass = migration.createContentType("martialClass").name("Martial Class");
  createCommonFields(martialClass);
  martialClass.createField("ageRange").name("Age Range").type("Symbol");

  const aboutPage = migration.createContentType("aboutPage").name("About Page");
  createCommonFields(aboutPage);

  const testimonial = migration.createContentType("testimonial").name("Testimonial");
  testimonial.createField("title").name("Reviewer Name").type("Symbol").required(true);
  testimonial.createField("description").name("Testimonial").type("Text");
  testimonial.createField("rating").name("Rating").type("Integer");

  const faq = migration.createContentType("faq").name("FAQ");
  faq.createField("title").name("Question").type("Symbol").required(true);
  faq.createField("description").name("Answer").type("Text");

  const calendarEvent = migration.createContentType("calendarEvent").name("Calendar Event");
  calendarEvent.createField("title").name("Title").type("Symbol").required(true);
  calendarEvent.createField("description").name("Description").type("Text");
  calendarEvent.createField("type").name("Type").type("Symbol");
  calendarEvent.createField("startDate").name("Start Date").type("Date");
  calendarEvent.createField("endDate").name("End Date").type("Date");
  calendarEvent.createField("isRecurring").name("Is Recurring").type("Boolean");
  calendarEvent.createField("recurringDay").name("Recurring Day").type("Symbol");
  calendarEvent.createField("recurringStartDate").name("Recurring Start Date").type("Date");
  calendarEvent.createField("recurringEndDate").name("Recurring End Date").type("Date");
};