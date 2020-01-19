<template>
	<div class="app-container">
		<el-row :gutter="20"
						style="margin-bottom:30px;">
			<el-col :span="6">
				<el-input v-model="article.title"
									placeholder="输入标题" />
			</el-col>
			<el-col :span="3">
				<el-select v-model="article.type_id"
									 placeholder="请选择">
					<el-option v-for="item in type"
										 :key="item.value"
										 :label="item.label"
										 :value="item.value">
					</el-option>
				</el-select>
			</el-col>
			<el-col :span="4">
				<el-date-picker v-model="article.addTime"
												type="date"
												placeholder="选择日期">
				</el-date-picker>
			</el-col>
			<el-col :span="6">
				<el-button type="primary"
									 @click="saveAirticle">发布</el-button>
			</el-col>
		</el-row>

		<el-row style="margin-bottom:30px;">
			<el-input type="textarea"
								:rows="2"
								placeholder="请输入简介"
								v-model="article.introduce">
			</el-input>
		</el-row>

		<el-row>
			<markdown-editor ref="markdownEditor"
											 v-model="article.article_content"
											 language="zh_CN"
											 height="600px" />
		</el-row>
	</div>
</template>

<script>
import MarkdownEditor from './components/MarkdownEditor'
import {
	getTypeInfo,
	addArticle,
	getArticleById,
	updateArticle
} from '@/api/table'
export default {
	components: {
		MarkdownEditor
	},
	data() {
		return {
			type: [],
			article: {
				title: '',
				article_content: '',
				introduce: '',
				addTime: '',
				type_id: '',
				article_content_html: '',
				introduce_html: ''
			}
		}
	},
	watch: {},
	mounted() {
		this.fetchTypeInfo()
		this.getAriticle()
	},
	methods: {
		getAriticle() {
			if (this.$route.params.id) {
				let id = this.$route.params.id
				getArticleById(id).then(res => {
					this.article = res.data[0]
				})
			}
		},
		fetchTypeInfo() {
			getTypeInfo().then(response => {
				response.data.forEach(item => {
					this.type.push({
						value: item.orderNum,
						label: item.typeName
					})
				})
			})
		},
		getHtml() {
			return this.$refs.markdownEditor.getHtml()
		},
		updateArticle(params) {
			updateArticle(params).then(response => {
				if (response.isScuccess) {
					this.article = {
						title: '',
						article_content: '',
						introduce: '',
						addTime: '',
						type_id: '',
						article_content_html: '',
						introduce_html: ''
					}
					this.$router.go(-1)
					this.$message.success('文章更新成功')
				} else {
					this.$message.error('文章更新失败')
				}
			})
		},
		addArticle(params) {
			addArticle(params).then(response => {
				if (response.isScuccess) {
					this.$message.success('文章发布成功')
					this.article = {
						title: '',
						article_content: '',
						introduce: '',
						addTime: '',
						type_id: '',
						article_content_html: '',
						introduce_html: ''
					}
				} else {
					this.$message.error('文章发布失败')
				}
			})
		},
		saveAirticle() {
			this.article.article_content_html = this.getHtml()
			let params = this.article
			if (this.$route.params.id) {
				this.updateArticle(params)
			} else {
				this.addArticle(params)
			}
		}
	}
}
</script>

