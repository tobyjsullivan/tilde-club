const ROOT = new Folder("");

// Represent a path to a file or folder as a doubly-linked list
function Path(absolute_path) {
  absolute_path = typeof absolute_path !== 'undefined' ? absolute_path : "/";

  this.root = new PathNode("", null);

  // Initialise to path provided in argument
  var path_parts = absolute_path.split('/');
  for(var i = 0; i < path_parts.length; i++) {
    if(path_parts[i] == "") {
      continue;
    }

    this.append(path_parts[i]);
  }

  this.append = function(name) {
    switch(name) {
      case '..':
        this.truncate();
        return;
      case '.':
        return; // Do nothing
      default:
        var last = this.last();
        last.child = new PathNode(name, last);
    }    
  }

  // Chop off the last element of the path. Usually used to handle '..'
  this.truncate = function() {
    this.last().parent.child = null;
  }

  this.last = function() {
    var cursor = this.root;

    while(cursor.child != null) {
      cursor = cursor.child;
    }

    return cursor;
  }

  this.getIterator = function() {
    return new PathIterator(this);
  }

  function PathNode(name, parent, child) {
    child = typeof child !== 'undefined' ? child : null;

    this.name = name;
    this.child = child;
    this.parent = parent;
  }

  function PathIterator(path) {
    this.next = path.root;

    this.getNext = function() {
      if(this.hasNext()) {
        var next = this.next;
        this.next = next.child;
        return next;
      } else {
        return null;
      }
    }

    this.hasNext = function() {
      return (this.next != null)
    }
  }
}

function Folder(name) {
  this.name = name;
  this.files = [];

  this.createFile = function(name) {
    var new_file = new File(name);
    this.files[this.files.length] = new_file;
    return new_file;
  }

  this.createFolder = function(name) {
    var new_folder = new Folder(name);
    this.files[this.files.length] = new_folder;
    return new_folder;
  }

  this.getCount = function() {
    return this.files.length;
  }

  this.getObject = function(index) {
    return this.files[index];
  }

  this.findObject = function(name) {
    var iterator = this.getIterator();

    while(iterator.hasNext()) {
      var current = iterator.getNext();
      if(current.name == name) {
        return current;
      }
    }

    return null;
  }

  this.getIterator = function() {
    return new FolderIterator(this);
  }
 
  function FolderIterator(folder) {
    this.folder = folder;
    this.cursor = 0;

    this.getNext = function() {
      if(this.hasNext()) {
        return this.folder.getObject(this.cursor++);
      } else {
        return null;
      }
    }

    this.hasNext = function() {
      return (this.cursor >= this.folder.getCount())
    }
  }
}

function File(name) {
  this.name = name;
  this.contents = "";

  this.append = function(contents) {
    this.contents += contents;
  }

  this.overwrite = function(contents) {
    this.contents = "";
    this.append(contents)
  }

  this.read = function() {
    return this.contents;
  }
}