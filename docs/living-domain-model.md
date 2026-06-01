# Living Domain Model

This document describes the current or the implemented domain model for the application. It is a living document that
gets updated as the application evolves. It doesn't represent the future or the ideal state of the domain model, but
rather the current state of the implementation.

## Component Diagram

```mermaid
flowchart TB
    Admin["Workspace Admin / Super Admin"]:::persona
    MongoDB[("MongoDB")]:::container

    subgraph KairosAPI["Kairos API Container"]
        Authentication["Authentication Component"]:::component
        Workspace["Workspace Component"]:::component
        Source["Source Component"]:::component
        Setup["Setup Component"]:::component
    end

    Admin --> Authentication
    Admin --> Workspace
    Admin --> Source
    Authentication --> MongoDB
    Workspace --> MongoDB
    Source --> MongoDB
    Setup --> MongoDB
    classDef persona fill: #fef9c3, stroke: #ca8a04, color: #111827
    classDef component fill: #fce7f3, stroke: #be185d, color: #111827
    classDef container fill: #e5e7eb, stroke: #4b5563, color: #111827
```

## Event Storming

Legend:

| Color                      | Meaning               |
|----------------------------|-----------------------|
| Orange                     | Domain events         |
| Light blue                 | Commands              |
| Yellow                     | Aggregates            |
| Red / purple               | Issues                |
| Yellow with stick figure   | User roles / personas |
| Green                      | Views                 |
| Pink notes with solid line | Bounded contexts      |
| Dashed lines               | Subdomains            |
| Arrows                     | Event flow            |
| Purple                     | Policies              |

```mermaid
flowchart LR
    Admin["Workspace Admin / Super Admin"]:::persona

    subgraph AuthenticationContext["Authentication"]
        LoginCommand["Command: Login"]:::command
        CredentialsChecked["Policy: Verify credentials"]:::policy
        AuthenticatedUser["Aggregate: Authenticated User"]:::aggregate
        LoginError["Issue: Invalid credentials"]:::issue
    end

    subgraph WorkspaceContext["Workspace"]
        CreateWorkspaceCommand["Command: Create workspace"]:::command
        WorkspaceDefaults["Policy: Apply workspace defaults"]:::policy
        WorkspaceAggregate["Aggregate: Workspace"]:::aggregate
        WorkspaceConflict["Issue: Workspace slug conflict"]:::issue
    end

    subgraph SourceContext["Source"]
        CreateSourceCommand["Command: Create source"]:::command
        SourceCredentials["Policy: Issue source write credentials"]:::policy
        SourceDefaults["Policy: Apply source defaults"]:::policy
        SourceAggregate["Aggregate: Source"]:::aggregate
        SourceConflict["Issue: Source app identifier conflict in workspace"]:::issue
    end

    Admin --> LoginCommand
    LoginCommand --> CredentialsChecked
    CredentialsChecked --> AuthenticatedUser
    CredentialsChecked --> LoginError
    Admin --> CreateWorkspaceCommand
    CreateWorkspaceCommand --> WorkspaceDefaults
    WorkspaceDefaults --> WorkspaceAggregate
    WorkspaceDefaults --> WorkspaceConflict
    Admin --> CreateSourceCommand
    CreateSourceCommand --> SourceCredentials
    SourceCredentials --> SourceDefaults
    SourceDefaults --> SourceAggregate
    SourceDefaults --> SourceConflict
    classDef persona fill: #fef9c3, stroke: #ca8a04, color: #111827
    classDef command fill: #dbeafe, stroke: #2563eb, color: #111827
    classDef aggregate fill: #fef3c7, stroke: #d97706, color: #111827
    classDef issue fill: #fee2e2, stroke: #dc2626, color: #111827
    classDef policy fill: #f3e8ff, stroke: #9333ea, color: #111827
```
