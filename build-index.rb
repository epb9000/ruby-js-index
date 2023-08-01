require "porter-stemmer"
require "json"
require_relative "quick-js-index"


if ARGV[0] == nil
    print "Input directory needed.\n"
    exit(1);
end

directory = ARGV[0];
stopword_path = File.join(File.dirname(__FILE__), 'gist_stopwords.txt')

if File.directory?(directory) == false
    print "Requested directory does not exist.\n"
    exit(2);
end



indexBuilder = QuickJsIndex.new
File.open(stopword_path).read.split(',') do |stopword|
    indexBuilder.add_stopword(stopword)
end

Dir.foreach(directory) do |filename|
    next if filename == '.' or filename == '..'
    compiled_path =  File.join(directory, filename)
    if File.file?(compiled_path)
        indexBuilder.import_file(compiled_path)
    end
end

indexBuilder.build_index
if ARGV[1] != nil
    engine_template = File.join(File.dirname(__FILE__), 'bundled-engine.js')
    print File.open(engine_template).read.sub("___OUTPUTNAME___", ARGV[1]).sub('{"INDEXCONTENT":1}', indexBuilder.index_json)
    print "\n"
else
    print indexBuilder.index_json
end

