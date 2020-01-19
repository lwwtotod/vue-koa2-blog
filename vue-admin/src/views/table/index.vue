<template>
	<div class="app-container">
		<el-table v-loading="listLoading"
							:data="list"
							element-loading-text="Loading"
							border
							fit
							highlight-current-row>
			<el-table-column align="center"
											 label="ID"
											 width="95">
				<template slot-scope="scope">
					{{ scope.$index }}
				</template>
			</el-table-column>
			<el-table-column label="标题">
				<template slot-scope="scope">
					{{ scope.row.title }}
				</template>
			</el-table-column>
			<el-table-column label="introduce"
											 align="center">
				<template slot-scope="scope">
					<span>{{ scope.row.introduce }}</span>
				</template>
			</el-table-column>
			<el-table-column label="分类"
											 width="110"
											 align="center">
				<template slot-scope="scope">
					{{ scope.row.typeName }}
				</template>
			</el-table-column>
			<el-table-column class-name="status-col"
											 label="view_count"
											 width="110"
											 align="center">
				<template slot-scope="scope">
					<el-tag :type="scope.row.view_count | statusFilter">{{ scope.row.view_count }}</el-tag>
				</template>
			</el-table-column>
			<el-table-column align="center"
											 prop="created_at"
											 label="添加时间"
											 width="200">
				<template slot-scope="scope">
					<i class="el-icon-time" />
					<span>{{ scope.row.addTime }}</span>
				</template>
			</el-table-column>
			<el-table-column align="center"
											 prop="created_at"
											 label="操作"
											 width="200">
				<template slot-scope="scope">
					<el-button type="primary"
										 icon="el-icon-edit"
										 @click="editAriticle(scope.row)"
										 circle></el-button>
					<el-button type="danger"
										 @click="delAriticle(scope.row)"
										 icon="el-icon-delete"
										 circle></el-button>
				</template>
			</el-table-column>

		</el-table>
	</div>
</template>

<script>
import { getList, delArticleById } from '@/api/table'

export default {
	filters: {
		statusFilter(status) {
			const statusMap = {
				published: 'success',
				draft: 'gray',
				deleted: 'danger'
			}
			return statusMap[status]
		}
	},
	data() {
		return {
			list: null,
			listLoading: true
		}
	},
	created() {
		this.fetchData()
	},
	methods: {
		editAriticle(row) {
			this.$router.push({
				path: `/airticle/${row.id}/index`
			})
		},
		delAriticle(row) {
			delArticleById(row.id).then(res => {
				this.fetchData()
				console.log('TCL: delAriticle -> res', res)
			})
		},
		fetchData() {
			this.listLoading = true
			getList().then(response => {
				this.list = response.list
				this.listLoading = false
			})
		}
	}
}
</script>
