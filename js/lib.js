const lib = {
  help: function() {
    print_line("Commands available:");
    print_line("HELP - display this help");
  },
  ls: function() {
    for(var i = 0; i < path.length; i++) {
      print_line("/"+path[i].name);
    }
  }
}