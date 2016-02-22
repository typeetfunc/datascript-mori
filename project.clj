(defproject demo-clj "0.1.0-SNAPSHOT"
  :description "FIXME: write this!"
  :url "http://example.com/FIXME"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}

  :min-lein-version "2.5.3"

  :dependencies [[org.clojure/clojure "1.7.0"]
                 [org.clojure/clojurescript "1.7.170"]
                 [mori "0.2.4"]
                 [datascript "0.15.0"]]

  :plugins [[lein-cljsbuild "1.1.2" :exclusions [[org.clojure/clojure]]]]

  :source-paths ["src"]

  :clean-targets ^{:protect false} ["resources/" "target"]

  :cljsbuild {:builds
              [{:id "min"
                :source-paths ["src"]
                :compiler {:output-to "release-js/datascript-mori.bare.js"
                           :main datascript-mori.core
                           :optimizations :advanced
                           :pretty-print false}
                :notify-command ["release-js/wrap_bare.sh"]}]}

  )
