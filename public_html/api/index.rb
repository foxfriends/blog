#!/usr/bin/ruby

# indexes the articles for faster searching
# but actually does nothing because there's not enough articles for it to matter

require 'cgi'
cgi = CGI.new
puts cgi.header
