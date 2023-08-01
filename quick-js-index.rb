class QuickJsIndex
    def initialize()
        @RawDocuments = []
        @stopwords = []
        @docs = []
        @index = {}
        @stemmer = ::Porter::Stemmer.new
    end

    def add_stopword(new_word)
        @stopwords.append(new_word)
    end

    def reset_stopwords()
        @stopwords = []
    end

    def import_file(path)
        dict = {}
        file = File.open(path)
        file_data = file.readlines.map(&:chomp)
        file.close
        dict["id"] = file_data.shift;
        dict["tokens"] = tokenize_and_stem_english(file_data.join(" "))
        @RawDocuments.append(dict)
    end

    def tokenize_and_stem_english(str)
        words = str.downcase.sub(/["']/,"").split(/[^\w0-9]+/) - @stopwords
        words.map!{ |x| @stemmer.stem(x) }
        words.uniq
    end

    def build_index()
        incrementer = 0
        @RawDocuments.each do |doc|
            @docs.append(doc["id"])
            doc["tokens"].each do |token|
                if @index.key?(token) == false
                    @index[token] = []
                end
                @index[token].append(incrementer)
            end
            incrementer += 1
        end
    end

    def index_json()
        {"documents":@docs, "index":@index}.to_json
    end
end