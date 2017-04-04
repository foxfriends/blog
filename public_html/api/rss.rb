#!/usr/bin/ruby

require 'cgi'
cgi = CGI.new
puts 'application/rss+xml'

puts '<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0"><channel>
<title>__HEADING__</title>
<link>http://blog.cameldridge.com/</link>
<description>In which I talk about my blog, among other things</description>'

articles = Dir['../articles/*'].sort_by { |e| -e[/\d+/].to_i }
found = articles[0...5] || []

puts found.map { |e|
  header = false
  data = { 'link' => e.split('/').last }
  File.foreach e + '/article.md' do |line|
    if line == "---\n"
      break if header
      header = true
      next
    end
    key, value = line.split ':'
    data[key.strip] = value.strip
  end
  data
} .map { |e|
  "<item>
  <title>#{e['title']}</title>
  <link>http://blog.cameldridge.com/post/#{e['link']}</link>
  <pubDate>#{e['date']}</pubDate>
  <description>#{e['subtitle']}</description>
  </item>"
}.join ''

puts '</channel></rss>'
