(defproject datascript-mori "0.16.2"
  :description "Wrapper for datascript interplay mori"
  :url "https://github.com/typeetfunc/datascript-mori"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}

  :min-lein-version "2.5.3"

  :dependencies [[org.clojure/clojure "1.10.0"]
                 [org.clojure/clojurescript "1.7.170"]
                 [datascript "0.16.1"]
                 [datascript-transit "0.2.2"]]

  :plugins [[lein-cljsbuild "1.1.2" :exclusions [[org.clojure/clojure]]]
            [lein-git-deps "0.0.2-SNAPSHOT"]]

  :git-dependencies [["https://github.com/swannodette/mori.git"]]
  :source-paths ["src" ".lein-git-deps/mori/src"]

  :clean-targets ^{:protect false} ["target"]

  :cljsbuild {:builds
              [{:id "min"
                :source-paths ["src" ".lein-git-deps/mori/src"]
                :compiler {
                           :output-to "release-js/datascript-mori.bare.js"
                           :main datascript-mori.core
                           :externs ["release-js/datascript-core.extern.js"]
                           :optimizations :advanced
                           :pretty-print false
                           }
                :notify-command ["release-js/wrap_bare.sh"]}]}

  )
