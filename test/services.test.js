var test = require('tape');
var fs = require('fs');
var path =  require('path');
var jsyaml = require('js-yaml');


var path = '_posts/';

// and then build array of posts
var posts = []
var file = fs.readdirSync(path);
file.forEach(function(i) {
  posts.push( path + i);
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
  } catch(err) {}
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
  } catch(err) {
    console.log("\nCould not read metadata, check the syntax of the metadata and front matter.\n");
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
  var content = file.content;
  
  test(post, function(t) {
    
    t.equal(typeof metadata, 'object', 'front matter must be formatted correctly');
    t.ok(metadata.title,'must have a title');
    t.ok(metadata.link,'must have a link to documentation');
    t.equal(typeof metadata.tags, 'object', 'tags must be formatted as a list');
    
    t.end();
    
  });
  
});