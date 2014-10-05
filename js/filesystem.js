const ROOT = new Folder("");

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