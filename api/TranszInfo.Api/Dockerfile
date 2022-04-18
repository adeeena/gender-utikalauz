FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env
WORKDIR /source/TranszInfo/api/TranszInfo.Api

# Copy everything
COPY . ./
# Restore as distinct layers
RUN dotnet restore
# Build and publish a release
RUN dotnet publish -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /source/TranszInfo/api/TranszInfo.Api
COPY --from=build-env /source/transz-info/api/TranszInfo.Api/out/ .
ENTRYPOINT ["dotnet", "TranszInfo.Api.dll"]