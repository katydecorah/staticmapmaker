var test = require('tape');
var fs = require('fs');
var path =  require('path');
var jsyaml = require('js-yaml');

var path = '_posts/';

// and then build array of posts
var posts = [];
var file = fs.readdirSync(path);
file.forEach(function(i) {
  posts.push(path + i);
});

// build list of form includes
var forms = [];
var file = fs.readdirSync('_includes/form/');
file.forEach(function(i) {
  forms.push(i.replace('.html', ''));
});

function readData(dir, filename) {
  var buffer = fs.readFileSync(dir + filename),
  file = buffer.toString('utf8');

  try {

    return {
      name: filename,
      file: file,
      metadata: jsyaml.load(file)
    };
  } catch (err) {}
}

function readPost(filename) {
  var buffer = fs.readFileSync(filename),
  file = buffer.toString('utf8');

  try {
    var parts = file.split(/---\s*[\n^]/),
    frontmatter = parts[1];

    return {
      name: filename,
      file: file,
      metadata: jsyaml.load(frontmatter),
      content: parts[2]
    };
  } catch (err) {
    console.log('\nCould not read metadata, check the syntax of the metadata and front matter.\n', filename);
  }
}

////////////////////////////////////////////////
////////////////////////////////////////////////
// POST TESTS
////////////////////////////////////////////////
////////////////////////////////////////////////

posts.forEach(function(post) {
  var file = readPost(post);

  var metadata = file.metadata;

  test(post, function(t) {

    t.equal(typeof metadata, 'object', 'front matter must be formatted correctly');
    t.ok(metadata.title,'must have a title');
    t.ok(metadata.link,'must have a link to documentation');
    t.equal(typeof metadata.tags, 'object', 'tags must be formatted as a list');
    t.ok(metadata.controls,'must have controls');
    t.equal(typeof metadata.controls, 'object', 'controls must be formatted as a list');

    metadata.controls.forEach(function(control) {
      t.ok(control.id, 'must have an id');
      t.ok(control.model, 'must have a model');
      t.equal(control.model.substr(0, 5), 'base.', 'model must start with "base." not ' + control.model.substr(0, 5));
      t.ok(control.include, 'must have an include');
      t.ok(control.popover, 'must have a popover');
      t.notEqual(forms.indexOf(control.include), -1, 'include must be one of the following: ' + forms.join(', '));
      t.ok(control.label, 'must have a label');
      if (control.include == 'select') t.ok(control.options, 'must have options');
      if (control.include == 'input') {
        t.ok(control.type, 'must have a type');
        t.notEqual(['text', 'number', 'range'].indexOf(control.type), -1, 'must have a valid type');
      }
    });

    t.end();

  });

});
