# == Schema Information
#
# Table name: images
#
#  id             :integer          not null, primary key
#  image_url      :string
#  imageable_id   :integer
#  imageable_type :string
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

class Image < ActiveRecord::Base
  validates :image_url, :imageable_type, :imageable_id, presence: true 

  belongs_to :imagable, :polymorphic => true
end
