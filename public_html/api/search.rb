#!/usr/bin/ruby

# gets a list of articles that match the request

require 'cgi'
cgi = CGI.new
puts cgi.header("type" => "application/json")

articles = Dir['../articles/*'].sort_by { |e| -e[/\d+/].to_i }
query = (cgi['search'] || '').downcase

if query != ''
  # someday make this a more meaningful search
  words = query.split ' '
  articleData = articles.map { |e|
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
  }
  articleData = articleData.select { |e|
    ((e['tags'] || '').downcase.split(',') & words).length > 0 ||
    ((e['keywords'] || '').downcase.split(',') & words).length > 0 ||
    (e['title'] || '').downcase.include?(query) ||
    (e['subtitle'] || '').downcase.include?(query)
  }.map { |e| e['link']}
  articles = articles.select { |e|
    articleData.include? e.split('/').last
  }
end

page = cgi['page'].empty? ? 1 : cgi['page'].to_i
found = []
if page == 1
  found = articles[0...5]
else
  found = articles[5 + (page - 1) * 10...5 + page * 10]
end

# some ghetto json stuff because the server doesn't have the JSON gem??
puts "{"
print "  \"articles\":"
if found == nil
  puts "[],"
else
  puts '[' + found.map { |e|
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
    "{
    \"title\":\"#{e['title']}\",
    \"subtitle\":\"#{e['subtitle']}\",
    \"image\":\"#{e['image']}\",
    \"author\":\"#{e['author']}\",
    \"date\":\"#{e['date']}\",
    \"tags\":[\"#{e['tags'].split(',').join('","')}\"],
    \"link\":\"#{e['link']}\"
  }"
  }.join(',') + '],'
end
puts "  \"last\": #{([articles.length - 5, 0].max / 10.0).ceil}"
puts "}"
