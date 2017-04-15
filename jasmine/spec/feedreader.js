/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
  /* This is our first test suite - a test suite just contains
   * a related set of tests. This suite is all about the RSS
   * feeds definitions, the allFeeds variable in our application.
   */
  describe('RSS Feeds', function () {
    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty. Experiment with this before you get started on
     * the rest of this project. What happens when you change
     * allFeeds in app.js to be an empty array and refresh the
     * page?
     */
    it('are defined', function () {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    /* TODO: Write a test that loops through each feed
     * in the allFeeds object and ensures it has a URL defined
     * and that the URL is not empty.
     */
    it('have URLs, defined as non empty strings', function () {
      allFeeds.forEach(function (feed) {
        expect(typeof feed.url).toBe('string');
        expect(feed.url.length).toBeGreaterThan(0);
      });
    });

    /* TODO: Write a test that loops through each feed
     * in the allFeeds object and ensures it has a name defined
     * and that the name is not empty.
     */
    it('have names, defined as non empty strings', function () {
      allFeeds.forEach(function (feed) {
        expect(typeof feed.name).toBe('string');
        expect(feed.name.length).toBeGreaterThan(0);
      });
    });
  });

  /* TODO: Write a new test suite named "The menu" */

  /* TODO: Write a test that ensures the menu element is
   * hidden by default. You'll have to analyze the HTML and
   * the CSS to determine how we're performing the
   * hiding/showing of the menu element.
   */

  /* TODO: Write a test that ensures the menu changes
   * visibility when the menu icon is clicked. This test
   * should have two expectations: does the menu display when
   * clicked and does it hide when clicked again.
   */
  describe('The menu', function () {
    function isSlideMenuHidden() {
      return $('.slide-menu').parents('.menu-hidden').length > 0;
    }

    it('is hidden by default', function () {
      expect(isSlideMenuHidden()).toBe(true);
    });

    it('changes visibility when the menu icon is clicked', function () {
      var $menuIcon = $('.menu-icon-link');
      if (isSlideMenuHidden() === true) {
        $menuIcon.trigger('click');
        expect(isSlideMenuHidden()).toBe(false);
      } else {
        $menuIcon.trigger('click');
        expect(isSlideMenuHidden()).toBe(true);
      }
      // Restore initial visibility state
      $menuIcon.trigger('click');
    });

  });

  /* TODO: Write a new test suite named "Initial Entries" */

  /* TODO: Write a test that ensures when the loadFeed
   * function is called and completes its work, there is at least
   * a single .entry element within the .feed container.
   * Remember, loadFeed() is asynchronous so this test will require
   * the use of Jasmine's beforeEach and asynchronous done() function.
   */
  describe('Initial entries', function () {
    beforeEach(function (done) {
      loadFeed(0, done);
    });

    it('have been loaded into the .feed container', function (done) {
      function isFeedContainerEmpty() {
        return $('.feed').find('.entry').length === 0;
      }
      expect(isFeedContainerEmpty()).toBe(false);
      done();
    });
  });
  /* TODO: Write a new test suite named "New Feed Selection" */

  /* TODO: Write a test that ensures when a new feed is loaded
   * by the loadFeed function that the content actually changes.
   * Remember, loadFeed() is asynchronous.
   */
  describe('New Feed Selection', function () {
    var $entries1 = $('.feed .entry');
    beforeEach(function (done) {
      loadFeed(1, done);
    });

    it('changes the content', function (done) {
      function areJqueryObjectsEqual(obj1, obj2) {
        return (obj1.length === obj2.length) &&
          (obj1.lenght === obj1.filter(obj2).length);
      }

      var $entries2 = $('.feed .entry');
      expect(areJqueryObjectsEqual($entries1, $entries2)).toBe(false);
      done();
    });
  });
}());
