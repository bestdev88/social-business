json.extract! project, :id, :user_id, :title, :subtitle, :body, :end_date,
 :category, :location
 json.image_url asset_path(project.image.url)
