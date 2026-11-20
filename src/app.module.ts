import { join } from 'node:path';
import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ProfileModule } from './presentation/profile/profile.module.js';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      // Apollo Sandbox is the GraphQL equivalent of Swagger UI for this API.
      // It is disabled by default when NODE_ENV=production, which most
      // hosting platforms (Render/Railway) set automatically — force it on
      // unconditionally so the reviewer can always open it. `playground: false`
      // stops @nestjs/apollo from also registering its own default landing
      // page plugin, which would otherwise collide with the one below.
      introspection: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
    }),
    ProfileModule,
  ],
})
export class AppModule {}
