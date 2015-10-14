# == Schema Information
#
# Table name: images
#
#  id            :integer          not null, primary key
#  image_url     :string
#  imagable_id   :integer
#  imagable_type :string
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  image_name    :string           not null
#

class Image < ActiveRecord::Base
  validates :image_url, :image_name, :imagable_type, :imagable_id, presence: true 

  belongs_to :imagable, :polymorphic => true
end
