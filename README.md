Show variables for Gitlab pipelines
===================================
![screenshot](/info/screen.png)

A Firefox extension that injects table in pipeline info well.
This information is not available (yet) in the Gitlab UI, but is available in the API, which is what the extension uses.

Works on self-hosted instances - regexp `^https://gitlab([.a-z-]+)/...`

Fork of the [Northern.tech](https://gitlab.com/Northern.tech/OpenSource/gitlab-show-pipeline-variables) extension.

## How to inject

This assumes you're running [nginx controller](https://github.com/kubernetes/ingress-nginx) in your cluster.  
Spin up an nginx pod and service with this config:
```
worker_processes 6;   
events {   worker_connections 2048;  } 
pid /tmp/nginx.pid; 
http {
    include mime.types;
    client_body_temp_path /tmp/client_temp;
    proxy_temp_path       /tmp/proxy_temp_path;
    fastcgi_temp_path     /tmp/fastcgi_temp;
    uwsgi_temp_path       /tmp/uwsgi_temp;
    scgi_temp_path        /tmp/scgi_temp;
    client_max_body_size 100M;
    access_log off; 
    server { 
        listen 8080;
        server_name .*; 
        location / {
            index variables.js; 
            alias /scripts/;
        } 
    } 
}
```
Don't forget to mount js file.

Add annotations to gitlab ingress:
```
    nginx.ingress.kubernetes.io/configuration-snippet: |
      sub_filter </head>
          '</head><script async language="javascript" src="https://your-gitlab-tld/-/ext-javascript/variables.js"></script>';
      sub_filter_once on;
    nginx.ingress.kubernetes.io/server-snippet: |
      location /-/ext-javascript/ {
          proxy_cache off;
          proxy_pass  http://nginx-injector-service.gitlab-namespace.svc.cluster.local:8080/;
      }
```

License
-------

Licensed under Apache License version 2.0. See the [`LICENSE`](LICENSE) file for
details.
