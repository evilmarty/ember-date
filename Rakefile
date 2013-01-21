desc "Run tests with phantomjs"
task :test, [:suite] => :dist do |t, args|
  require "colored"

  unless system("which phantomjs > /dev/null 2>&1")
    abort "PhantomJS is not installed. Download from http://phantomjs.org"
  end

  puts "\n"

  cmd = "phantomjs test/qunit/run-qunit.js \"file://localhost#{File.dirname(__FILE__)}/test/index.html\""
  system(cmd)

  # A bit of a hack until we can figure this out on Travis
  tries = 0
  while tries < 3 && $?.exitstatus === 124
    tries += 1
    puts "\nTimed Out. Trying again...\n"
    system(cmd)
  end

  success = $?.success?

  if success
    puts "\nTests Passed".green
  else
    puts "\nTests Failed".red
    exit(1)
  end
end

task :default => :test
