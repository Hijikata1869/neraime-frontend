PROJECT_ROOT="$(cd "$(dirname "$0")/../../.." && pwd)"
docker compose -f "$PROJECT_ROOT/neraime_api/compose.e2e.yaml" exec e2e \ 
bundle exec rake e2e:prepare