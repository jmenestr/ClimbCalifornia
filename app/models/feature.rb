# == Schema Information
#
# Table name: features
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Feature < ActiveRecord::Base
  validates :name, presence: true, allow_blank: false
  has_many :adventure_features
end
