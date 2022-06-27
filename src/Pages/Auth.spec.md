```mermaid
flowchart TD
  A(( )) --> B{{has token ?}}
  B --> |yes| C[save token] --> D[redirect /Home]
  B --> |no| D --> E(( ))
```