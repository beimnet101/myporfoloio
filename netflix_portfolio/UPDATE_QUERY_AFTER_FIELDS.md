# How to Update Query After Creating Fields

## Current Status

The query is currently commented out for `linkedinLink` and `profileSummary` because these fields don't exist in DatoCMS yet.

## Once You Create the Fields in DatoCMS:

1. **Create the fields** (see FIELD_STATUS.md)
2. **Wait 10-30 seconds** for GraphQL schema to update
3. **Uncomment the fields** in `src/queries/getProfileBanner.ts`:

Change this:
```graphql
const GET_PROFILE_BANNER = `
 {
  profilebanner {
    backgroundimage {
      url
    }
    headline
    resumeLink
    # linkedinLink and profileSummary will be added once fields are created in DatoCMS
    # linkedinLink
    # profileSummary
  }
}
`;
```

To this:
```graphql
const GET_PROFILE_BANNER = `
 {
  profilebanner {
    backgroundimage {
      url
    }
    headline
    resumeLink
    linkedinLink
    profileSummary
  }
}
`;
```

4. **Save the file**
5. **Refresh your React app**

The component is already set up to handle these fields, so once you uncomment them and the fields exist in DatoCMS, everything will work!


