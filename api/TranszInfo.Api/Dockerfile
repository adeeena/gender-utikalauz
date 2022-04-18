FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env
WORKDIR /source/mikroagresszi-wiki/api/MikroagressziWiki.Api

# Copy everything
COPY . ./
# Restore as distinct layers
RUN dotnet restore
# Build and publish a release
RUN dotnet publish -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /source/mikroagresszi-wiki/api/MikroagressziWiki.Api
COPY --from=build-env /source/mikroagresszi-wiki/api/MikroagressziWiki.Api/out/ .
ENTRYPOINT ["dotnet", "MikroagressziWiki.Api.dll"]