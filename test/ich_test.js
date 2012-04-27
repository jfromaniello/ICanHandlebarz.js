function isEmptyObject( obj ) {
  for ( var name in obj ) {
    return false;
  }
  return true;
}

module("ICanHandlebarz");

test("creates function for template", function() {
  expect(1);
  ok(ich.test1 != null, "test1 template exists");
});

test("renders non-parameterized templates", function() {
  expect(3);
  equal(ich.test1({}, true), "<p>This is a test of the emergency broadcast system.</p>"); // raw text
  var nodes = ich.test1({});
  equal(typeof nodes, "object"); 
  equal(nodes.text(), "This is a test of the emergency broadcast system."); 
});

test("renders parameterized templates", function() {
  // expect(1);
  equal(ich.test2({prey:'wabbits'}, true), "<span>Be vewwy vewwy quiet, we're hunting wabbits.</span>"); 
});

test("renders ad hoc templates", function() {
  ich.addTemplate('favoriteColor', 'Red. No, Blue. Aieee!');
  expect(1);
  equal(ich.favoriteColor({}, true), 'Red. No, Blue. Aieee!');
});

test("renders multiple partials", function() {
  expect(1);
  var data = { "people": [
    { "name": "Alan", "id": 1 },
    { "name": "Yehuda", "id": 2 }
  ]}
  equal(ich.listofpeople(data, true), '<ul><li><a href="/people/1">Alan</a></li><li><a href="/people/2">Yehuda</a></li></ul>');
});

// Newly added support for partials
test("renders partials from &lt;script&gt; tags with class=\"partial\"", function() {
  // partials example from the Mustache README
  expect(1);
  var view = {
    name: "Joe",
      value: 1000,
      taxed_value: function() {
        return this.value - (this.value * 0.4);
      }
  }
  equal(ich.welcome(view, true), "<p>Welcome, Joe! You just won $1000 (which is $600 after tax)</p>");
});

test("renders partials added at runtime", function() {
  // partials example from the Mustache README
  ich.addPartial('winnings2', "You just won ${{value}} (which is ${{taxed_value}} after tax)");
  ich.addTemplate('welcome2', "Welcome, {{name}}! {{>winnings2}}");
  expect(1);
  var view = {
    name: "Joe",
    value: 1000,
    taxed_value: function() {
      return this.value - (this.value * 0.4);
    }
  }
  equal(ich.welcome2(view, true), 'Welcome, Joe! You just won $1000 (which is $600 after tax)');
});

test("renders templates using helpers from &lt;script&gt; tags with class=\"helper\"", function() {
  var data = {
    name: "Jenny",
    phone: 6875309
  }
  equal(ich.phonetest(data, true), 'Jenny, I\'ve got your number: 687-5309');
});

test("renders templates using helpers added at runtime", function() {
  ich.addHelper('dateformat', 
      function(aspDateString) {
          aspDateString = aspDateString.toString()
          var dateObject = new Date(parseInt(aspDateString.substr(6)));
          return (dateObject.getMonth()+1) + '/' + dateObject.getDay() + '/' + dateObject.getFullYear();
      });
  equal(ich.datetest({aspDate: "\/Date(1325307600000)\/"}, true), 'This page last modified on 12/6/2011');
});

test("showAll shouldn't let you edit actual templates", function () {
  var welcome = ich.templates.welcome;
  
  ich.templates.welcome = "something new";
  notEqual(ich.welcome, "something new", "the template should not have changed");
});

test("clearAll should wipe 'em out", function () {
  ich.clearAll();
  
  ok(isEmptyObject(ich.templates));
  ok(isEmptyObject(ich.partials));

  equal(ich['welcome2'], undefined, "welcome2 template gone?");
});

test("grabTemplates that are loaded in later", function () {
  // not recommended use, but should work nonetheless
  $('head').append('<script id="flint" type="text/html">yabba {{ something }} doo!</script>');
  
  ich.grabTemplates();
  equal(ich.flint({something: 'dabba'}, true), "yabba dabba doo!", "should have new template");
});

test("refresh should empty then grab new", function () {
  // not recommended use, but should work nonetheless
  $('head').append('<script id="mother" type="text/html">your mother was a {{ something }}...</script>');
  
  ich.refresh();
  
  equal(ich.mother({something: 'hampster'}, true), "your mother was a hampster...", "should have new template");
  equal(ich.hasOwnProperty('flint'), false, "flint template should be gone");
});


test("renders multi parameterized templates", function() {
  expect(1);
  equal(ich.test2.each([{prey:'first'}, {prey:'second'}], true), 
        "<span>Be vewwy vewwy quiet, we're hunting first.</span>" +
        "<span>Be vewwy vewwy quiet, we're hunting second.</span>"); 
});