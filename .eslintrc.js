module.exports = {
	plugins: ["boundaries"],
	rules: {
		"boundaries/element-types": [
			2,
			{
				default: "disallow",
				rules: [
					{
						from: "entities",
						allow: ["shared"],
					},
					{
						from: "widgets",
						allow: ["shared", "entities"],
					},
					{
						from: "views",
						allow: ["shared", "entities", "widgets"],
					},
				],
			},
		],
	},
	settings: {
		"boundaries/elements": [
			{ type: "shared", pattern: "src/shared" },
			{ type: "entities", pattern: "src/entities" },
			{ type: "widgets", pattern: "src/widgets" },
			{ type: "views", pattern: "src/views" },
		],
	},
};
