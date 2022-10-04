Show variables for Gitlab pipelines
===================================
![screenshot](/info/screen.png)

Firefox extension which injects a table in the pipeline info well.
This information is not available (yet) in the Gitlab UI, but it
is available in the API, which is what the extension uses.

Works on a self-hosted instances - regexp `^https://gitlab([.a-z-]+)/...`

Fork of the [Northern.tech](https://gitlab.com/Northern.tech/OpenSource/gitlab-show-pipeline-variables) extension.

License
-------

Licensed under Apache License version 2.0. See the [`LICENSE`](LICENSE) file for
details.
