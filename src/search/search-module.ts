import { Module } from "@nestjs/common";
import { ElasticsearchModule } from "@nestjs/elasticsearch";

@Module({
    imports: [ElasticsearchModule.register({
        node: 'nodeURL:9200',
    })],
})
export class SearchModule {}