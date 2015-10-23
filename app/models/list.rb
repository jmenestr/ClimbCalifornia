# == Schema Information
#
# Table name: lists
#
#  id          :integer          not null, primary key
#  title       :string           not null
#  description :text
#  user_id     :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class List < ActiveRecord::Base
  validates :title, :user_id, presence: true 

  belongs_to :user
  has_many :adventure_lists, dependent: :destroy
  has_many :adventures, through: :adventure_lists 

  has_many :images, through: :adventures

end
