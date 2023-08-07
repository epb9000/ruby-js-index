require 'readability'
require 'open-uri'
require 'json'
require 'nokogiri'

if ARGV[0] == nil
    print "Input URL needed. Will produce a JSON object suitable for build-index.rb\n"
    exit(1);
end

source = URI.open(ARGV[0],
    {"User-Agent" => "SearchIndexBuilder Ruby/#{RUBY_VERSION}"}).read
doc = Readability::Document.new(source);

fullpage = Nokogiri::HTML(source)
meta_desc = fullpage.xpath('/html/head/meta[@name="description"]/@content');
meta_desc = meta_desc != nil ? meta_desc.to_s : ""

scraped_object = {
    "meta" => {
        "title" => doc.title,
        "url" => ARGV[0],
        "meta_desc" => meta_desc
    },
    "text" => doc.title + " " + Nokogiri::HTML(doc.content).text + meta_desc
}
print scraped_object.to_json