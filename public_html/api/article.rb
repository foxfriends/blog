#!/usr/bin/ruby

# gets the header data and text of an article

require 'cgi'
cgi = CGI.new
puts cgi.header("type" => "application/json")

id = cgi['id']
state = 0
data = { 'link' => id, 'text' => '' }

# some ghetto json stuff because the server doesn't have the JSON gem??
File.foreach "../articles/#{id}/article.md" do |line|
  state += 1 and next if line == "---\n"
  case state
  when 1
    key, value = line.split ':'
    data[key.strip] = value.strip
  when 2
    data['text'] += line.gsub(/\n/, '\n').gsub(/"/, '\\"')
  end
end

puts "{
  \"title\":\"#{data['title']}\",
  \"subtitle\":\"#{data['subtitle']}\",
  \"image\":\"#{data['image']}\",
  \"author\":\"#{data['author']}\",
  \"date\":\"#{data['date']}\",
  \"tags\":#{data['tags'].split(',')},
  \"link\":\"#{data['link']}\",
  \"text\":\"#{data['text']}\"
}"
