FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["Programa de estandardizacao de leite/Programa de estandardizacao de leite.csproj", "Programa de estandardizacao de leite/"]
RUN dotnet restore "Programa de estandardizacao de leite/Programa de estandardizacao de leite.csproj"
COPY . .
WORKDIR "/src/Programa de estandardizacao de leite"
RUN dotnet build "Programa de estandardizacao de leite.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Programa de estandardizacao de leite.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Programa de estandardizacao de leite.dll"]
