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

    /* I was asked to: Write a test that loops through each feed
     * in the allFeeds object and ensures it has a URL defined
     * and that the URL is not empty.
     */
    it('have URLs, defined as non empty strings', function () {
      allFeeds.forEach(function (feed) {
        expect(typeof feed.url).toBe('string');
        expect(feed.url.length).toBeGreaterThan(0);
      });
    });

    /* I was asked to: Write a test that loops through each feed
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

  /* I was asked to: Write a new test suite named "The menu" */
  describe('The menu', function () {

    /* I was asked to: Write a test that ensures the menu element is
     * hidden by default. You'll have to analyze the HTML and
     * the CSS to determine how we're performing the
     * hiding/showing of the menu element.
     */
    function isSlideMenuHidden() {
      return $('.menu-hidden .slide-menu').length > 0;
      // return $('.slide-menu').parents('.menu-hidden').length > 0;
    }

    it('is hidden by default', function () {
      expect(isSlideMenuHidden()).toBe(true);
    });

    /* I was asked to: Write a test that ensures the menu changes
     * visibility when the menu icon is clicked. This test
     * should have two expectations: does the menu display when
     * clicked and does it hide when clicked again.
     */
    it('changes visibility when the menu icon is clicked', function () {
      var $menuIcon = $('.menu-icon-link');
      // Hide slide menu
      $('body').addClass('menu-hidden');
      $menuIcon.trigger('click');
      expect(isSlideMenuHidden()).toBe(false);
      $menuIcon.trigger('click');
      expect(isSlideMenuHidden()).toBe(true);
    });

  });

  /* I was asked to: Write a new test suite named "Initial Entries" */
  describe('Initial entries', function () {

    /* I was asked to: Write a test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     * Remember, loadFeed() is asynchronous so this test will require
     * the use of Jasmine's beforeEach and asynchronous done() function.
     */
    beforeEach(function (done) {
      loadFeed(0, done);
    });

    function isFeedContainerEmpty() {
      return $('.feed .entry').length === 0;
    }

    it('have been loaded into the .feed container', function () {
      expect(isFeedContainerEmpty()).toBe(false);
    });
  });

  /* I was asked to: Write a new test suite named "New Feed Selection" */
  describe('New Feed Selection', function () {

    /* I was asked to: Write a test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     * Remember, loadFeed() is asynchronous.
     */
    var $entriesOld;
    beforeEach(function (done) {
      loadFeed(0, function () {
        $entriesOld = $('.feed .entry');
        loadFeed(1, done);
      });
    });

    // Equal in this context means, that they have the same elements
    function areJqueryObjectsEqual(obj1, obj2) {
      if (obj1.length !== obj2.length) {
        return false;
      }
      for (var i = 0; i < obj1.length; i++) {
        if (obj1[i].innerHTML !== obj2[i].innerHTML) {
          return false;
        }
      }
      return true;
    }

    it('changes the content', function () {
      var $entriesNew = $('.feed .entry');
      expect(areJqueryObjectsEqual($entriesOld, $entriesNew)).toBe(false);
      // This one, tests that areJqueryObjectsEqual() works properly
      // expect(areJqueryObjectsEqual($('.feed .entry'), $entriesNew)).toBe(true);
    });
  });
}());
