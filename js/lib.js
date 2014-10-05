const lib = {
  help: function(topic) {
    topic = typeof topic !== 'undefined' ? topic : "";

    switch(topic.toLowerCase()) {
      case 'pwd':
        print_line("Print the current directory");
        break;
      default:
        print_line("Commands available:");
        print_line("HELP - display this help");
        print_line("PWD - print current directory");
        break;
    }
  },
  pwd: function() {
    var path_iter = current_path.getIterator();

    while(path_iter.hasNext()) {
      print_line("/"+path_iter.getNext().name);
    }
  },
  cd: function(path) {
    var path_parts = path.split('/');
    for(var i = 0; i < path_parts.length; i++) {
      if(path_parts[i] == "") {
        continue;
      }

      current_path.append(path_parts[i]);
    }
  }
}